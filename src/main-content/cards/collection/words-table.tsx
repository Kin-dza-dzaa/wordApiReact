import Table from 'antd/lib/table';
import React, { useState } from 'react'
import { DeleteWords, UpdateWord, WordStruct } from '../../../api/words-calls';
import Column from 'antd/lib/table/Column';
import Input from 'antd/lib/input/Input';
import { StyledDelete, StyledEdit, StyledSend } from './words-table-styled';
import { Button, message } from 'antd';
import Form from 'antd/lib/form';
import { useForm } from 'antd/lib/form/Form';

interface WordRow {
    key: number;
    word: string;
}

export const WordsTable = (props: { words: WordStruct[], collectionName: string }) => {
    const [tableData, setTableData] = useState(() => {
        const data: WordRow[] = [];
        props.words.map((value, index) => {
            data.push({
                key: index,
                word: value.word,
            });
        })
        return data;
    });
    const handleDelete = (record: WordRow) => {
        setTableData(tableData.filter((value) => value != record));
        DeleteWords([record.word], props.collectionName);
    }
    return (
        <Table
            dataSource={tableData}
            size={"small"}
        >
            <Column align="center" title="Word" dataIndex="word" key="word" render={(_: any, record: WordRow) => {
                return (
                    <WordColumn initialWord={record.word} collection_name={props.collectionName} />
                );
            }} />
            <Column align="center" title="Delete" key="delete" render={(_: any, record: WordRow) => {
                return <StyledDelete onClick={() => handleDelete(record)} />;
            }} />
        </Table>
    );
}

const WordColumn = (props: { initialWord: string, collection_name: string }) => {
    const [currentWordInDb, setCurrentWord] = useState(props.initialWord);
    const [isLoading, setLoading] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [form] = useForm();
    const handleUpdate = () => {
        form.validateFields().then((fields) => {
            setLoading(true);
            UpdateWord(currentWordInDb, fields.word.trim().toLowerCase(), props.collection_name).then((json) => {
                if (json.result === "ok") {
                    message.success({ content: json.message, style: { marginTop: '90vh' } });
                    setCurrentWord(fields.word);
                } else {
                    message.error({ content: json.message, style: { marginTop: '90vh' } });
                    form.setFieldValue("word", currentWordInDb);
                }
                setLoading(false);
            });
        })
            .catch(() => setLoading(false));
    }
    return (
        <React.Fragment>
            <Form
                form={form}
                name="basic"
                labelAlign="left"
                initialValues={{ word: currentWordInDb }}
                autoComplete="off"
                style={{ userSelect: "none", display: "grid", gridTemplateColumns: "110px 1fr", placeItems: "center", gap: "10px" }}
            >
                {
                    isOpen ?
                        <Form.Item
                            name="word"
                            style={{"marginLeft": "5%"}}
                            rules={
                                [
                                    {
                                        validator: (_, word: string) => {
                                            if (word.trim().toLowerCase() === currentWordInDb.toLocaleLowerCase()) return Promise.reject(new Error("Enter new word"));
                                            if (word.trim().length === 0) return Promise.reject(new Error("Required"));
                                            return Promise.resolve();
                                        },
                                    },
                                ]
                            }
                        >
                            <Input spellCheck size="small" />
                        </Form.Item>
                        :
                        <Form.Item
                            style={{"marginLeft": "5%"}}
                        >
                            {currentWordInDb}
                        </Form.Item>

                }
                <Form.Item>
                    {
                        isOpen ?
                            <Button type="default" shape="circle" loading={isLoading} icon=<StyledSend /> onClick={handleUpdate} />
                            :
                            <Button type="default" shape="circle" loading={isLoading} icon=<StyledEdit /> onClick={() => setOpen(!isOpen)} />
                    }
                </Form.Item>
            </Form>
        </React.Fragment>
    );
}