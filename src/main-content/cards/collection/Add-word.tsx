import { Button, Input, message, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Form from 'antd/lib/form';
import React, { useState } from 'react'
import { AddWords } from '../../../api/words-calls';
import { StyledDelete, StyledPlus } from '../add-collection-styled';

const Paragraph = Typography;

export const AddForm = (props: {words: string[], collection_name: string}) => {
    const [form] = useForm();
    const [words, setWords] = useState([] as string[]);
    const [isLoading, setLoading] = useState(false);
    const addWord = () => {
        try {
            const word: string = form.getFieldValue("word").trim().toLocaleLowerCase();
            if (word.length === 0 || words.includes(word) || props.words.includes(word)) return;
            setWords([...words, word]);
            form.setFieldValue("word", "");   
        } catch (error) {
            return;
        }
    }
    const sendWords = () => {
        form.validateFields()
        .then(() => {
            AddWords(words, props.collection_name)
            .then((json) => {
                if (json.result === "ok") {
                    setWords([]);
                    setLoading(false);
                    if (json.bad_words) {
                        message.info(`Some words were not added, bad words: ${json.bad_words.join(", ")}`);
                    } else message.success("Words were added");
                }
            })
            .catch(() => message.error("Api isn't responding try 5 min later"));
        })
        .catch(() => setLoading(false));
    }
    return (
        <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            form={form}
            
        >
            <Form.Item
                name="word"
                label="Word"
                rules={[
                    { validator: async (_: any, value: string): Promise<void> => {
                        if (words.includes(value.trim().toLocaleLowerCase()) ||  props.words.includes(value.trim().toLocaleLowerCase())) return Promise.reject(new Error("You've already added this word"));
                        if (words.length === 0) return Promise.reject(new Error("Add some words"));
                        return Promise.resolve();
                    }},
                ]}
            >
                <Input suffix=<StyledPlus onClick={addWord}/> onPressEnter = {addWord}/>
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
            <Form.Item wrapperCol={{offset: 9}}>
                <Button loading={isLoading} onClick={() => {setLoading(true); sendWords()}}>Add words</Button>
            </Form.Item>
        </Form>
    );
}
