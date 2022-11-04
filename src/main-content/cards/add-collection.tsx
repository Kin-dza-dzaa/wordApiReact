import { useQueryClient } from '@tanstack/react-query';
import { Button, message, notification, Typography } from 'antd';
import Form from 'antd/lib/form';
import { useForm } from 'antd/lib/form/Form';
import Input from 'antd/lib/input/Input';
import React, { useState } from 'react'
import { AddWords } from '../../api/words-calls';
import { StyledDelete, StyledPlus } from './add-collection-styled';

const { Paragraph } = Typography;

export const AddCollection = (props : {collections: string[], setOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [words, setWords] = useState([] as string[]);
    const [isLoading, setLoading] = useState(false);
    const [form] = useForm();
    const queryClinet = useQueryClient();
    const addWord = () => {
        try {
            const word: string = form.getFieldValue("word").trim().toLocaleLowerCase();
            if (word.length === 0 || words.includes(word)) return;
            setWords([...words, word]);    
            form.setFieldValue("word", "");    
        } catch (error) {
            return;
        }
    }
    const addCollection = () => {
        form.validateFields()
        .then((fields) => {
            AddWords(words, fields.collection_name)
            .then((json) => {
                if (json.result === "ok") {
                    queryClinet.invalidateQueries(["words"]);
                    setLoading(false);
                    props.setOpen(false);
                    if (json.bad_words) {
                        notification.info({
                            message: "Some words were not added",
                            description: `Bad words: ${json.bad_words.join(", ")}`,
                            placement: "bottom",
                            duration: 4,
                        });
                    } else {
                        message.success("Collection was created");
                    }
                }
            })
            .catch(() => message.error("Api isn't responding try 5 min later"));
        })
        .catch(() => setLoading(false));
    }
    return (
        <Form
            form={form}
            name="basic"
            labelAlign="left"
            labelCol={{ span: 6}}
            wrapperCol={{ span: 17 }}
            autoComplete="off"  
            style={{userSelect: "none"}}
        >
            <Form.Item
                name="collection_name"
                rules={
                    [
                        { 
                            validator: async (_, collection_name: string) => {
                                if (!collection_name || collection_name.trim().length === 0)  return Promise.reject(new Error('Required'));
                                if (props.collections.includes(collection_name.trim())) return Promise.reject(new Error('Collection with that name already exists'));
                                return Promise.resolve();    
                            },
                        }
                    ]
                }
                label="Collection name"
            >
                <Input  />
            </Form.Item>
            <Form.Item
                name="word"
                required
                rules={
                    [
                        { 
                            validator: async (_, value: string) => {
                                if (words.includes(value.trim().toLowerCase())) return Promise.reject( new Error("You've already added this word"));
                                if (words.length === 0) return Promise.reject(new Error("You can't add collection without words"));
                                return Promise.resolve();    
                            },
                        }
                    ]
                }
                label="Add words"
            >
                <Input spellCheck suffix=<StyledPlus onClick={addWord} /> onPressEnter={addWord} />
            </Form.Item>
            <div style={{display: "grid", gridTemplateColumns: "85% 40px", gap:"20px", marginBottom: "30px"}}>
                {
                    words.map((word, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Paragraph style={{margin: 0}}>{word}</Paragraph>
                                <StyledDelete onClick={() => setWords([...words.slice(0, index), ...words.slice(index + 1, words.length)])} />
                            </React.Fragment>
                            );
                    })
                }
            </div>
            <Form.Item wrapperCol={{offset: 10}}>
                <Button loading={isLoading} type="primary" onClick={() => {setLoading(true); addCollection()}}>Add</Button>
            </Form.Item>
        </Form>
    );
}
