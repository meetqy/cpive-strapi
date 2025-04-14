import type {
  BulkActionComponent,
  BulkActionComponentProps,
} from "@strapi/content-manager/strapi-admin";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Combobox,
  ComboboxOption,
  Field,
  Grid,
  Modal,
  Searchbar,
  SingleSelect,
  SingleSelectOption,
  Tag,
  TextInput,
  useFilter,
} from "@strapi/design-system";
import {
  SearchInput,
  useFetchClient,
  useNotification,
} from "@strapi/strapi/admin";
import qs from "qs";
import { MouseEvent, useEffect, useState } from "react";
import { Cross } from "@strapi/icons";

export const BatchAddTagsButton: BulkActionComponent = ({
  collectionType,
  documents,
  model,
}: BulkActionComponentProps) => {
  const notification = useNotification();
  if (model != "api::media-info.media-info") return null;

  return {
    label: "Update Tags",
    dialog: {
      type: "modal",
      title: "Choose Tags",
      content: ({ onClose }) => {
        const { get, put } = useFetchClient();
        const [tags, setTags] = useState<
          { name: string; id: number; documentId: string }[]
        >([]);
        const [selectTags, setSelectTags] = useState<
          { name: string; id: number; documentId: string }[]
        >([]);

        const getTags = async (q = "", ids?: number[]) => {
          const { data } = await get(
            `/content-manager/relations/api::media-info.media-info/tags`,
            {
              params: qs.stringify({
                pageSize: 10,
                idsToOmit: ids,
                _q: q,
                page: 1,
              }),
            }
          );

          setTags(data.results);
          return data;
        };

        useEffect(() => {
          getTags();
        }, []);

        const handleSubmit = async (type: "connect" | "disconnect") => {
          try {
            await Promise.all(
              documents.map((item) =>
                put(
                  `/content-manager/collection-types/api::media-info.media-info/${item.documentId}`,
                  {
                    tags: {
                      [type]: selectTags.map((tag) =>
                        type === "connect"
                          ? {
                              id: tag.id,
                              documentId: tag.documentId,
                              isTemporary: true,
                            }
                          : { id: tag.id, documentId: tag.documentId }
                      ),
                    },
                  }
                )
              )
            );
            notification.toggleNotification({
              type: "success",
              message: "Tags updated successfully",
            });
          } catch (e) {
            notification.toggleNotification({
              type: "warning",
              message: "Failed to update tags",
            });
          }

          onClose();
        };

        return (
          <>
            <Modal.Body>
              <div style={{ display: "flex", gap: 20 }}>
                <div style={{ width: "50%" }}>
                  <TextInput
                    style={{ width: "100%" }}
                    placeholder="Search tags"
                    type="text"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        getTags(
                          e.currentTarget.value,
                          selectTags.map((item) => item.id)
                        );
                      }
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 12,
                      marginTop: 20,
                      width: "100%",
                    }}
                  >
                    {tags.map((item) => (
                      <Checkbox
                        key={item.id}
                        value={item.id.toString()}
                        checked={selectTags.some((tag) => tag.id === item.id)}
                        onCheckedChange={(e) => {
                          selectTags.some((tag) => tag.id === item.id);
                          if (e) {
                            setSelectTags((prev) => [...prev, item]);
                          } else {
                            setSelectTags((prev) =>
                              prev.filter((tag) => tag.id !== item.id)
                            );
                          }
                        }}
                      >
                        {item.name}
                      </Checkbox>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, width: "50%" }}>
                  {selectTags.map((item) => (
                    <Tag
                      label={item.name}
                      key={item.id}
                      icon={<Cross aria-hidden />}
                      onClick={() => {
                        setSelectTags((prev) =>
                          prev.filter((tag) => tag.id !== item.id)
                        );
                      }}
                    >
                      {item.name}
                    </Tag>
                  ))}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="tertiary" onClick={onClose}>
                Cancel
              </Button>
              <div style={{ display: "flex", gap: 12 }}>
                <Button
                  variant="danger"
                  onClick={() => handleSubmit("disconnect")}
                >
                  DisConnect
                </Button>
                <Button onClick={() => handleSubmit("connect")}>Connect</Button>
              </div>
            </Modal.Footer>
          </>
        );
      },
    },
  };
};
