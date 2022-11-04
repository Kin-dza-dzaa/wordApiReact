import React, { useRef, useState, useEffect } from 'react'
import Carousel, { CarouselRef } from 'antd/lib/carousel'
import { Button, Divider, Segmented, Typography } from 'antd';
import { WordStruct } from '../../../api/words-calls';
import { UpdateState } from '../../../api/words-calls';
import { useQueryClient } from '@tanstack/react-query';
import { DoubleRightOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

export const LearnCarousel = (props: { words: WordStruct[], collectionName: string, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [words, setWords] = useState(props.words.filter((value) => (value.state * 24 * 60 * 60 * 1000 + value.time_of_last_repeating) < (new(Date)).getTime()));
    const [isDataOpen, setDataOpen] = useState(false);
    const [currentIndex, setIndex] = useState(0);
    const [selectedValue, setSelectedValue] = useState("Translations");
    const carouselRef = useRef<CarouselRef | null>(null);
    const queryClient = useQueryClient();
    const updateState = (index: number) => {
        if (index + 1 === words.length) {
            setIndex(0);
        } else {
            setIndex(index);
        }
        setWords([...words.slice(0, index), ...words.slice(index + 1, words.length)]);
        UpdateState(words[index], props.collectionName);
    }
    useEffect(() => {
        if (words.length === 0) {
            queryClient.invalidateQueries(["words"]);
            props.setOpen(false);
        }
    }, [words]);
    return (
            <Carousel ref={carouselRef} initialSlide={currentIndex} dots={false} effect="fade" >
                {
                    words.map((value, index) => {
                        return (
                            <div key={index}>
                                <Paragraph style={{ textAlign: "center" }}>Word:{" " + value.word}</Paragraph>
                                <Paragraph style={{ textAlign: "center" }}>Paragrapharts of speech:{" " + Array.from(value.transltions.keys()).join(", ")}</Paragraph>
                                {
                                    isDataOpen ?
                                        <div style={{ overflow: "auto", maxHeight: "75vh", minHeight: "100%" }}>
                                            <Segmented
                                                options={
                                                    [
                                                        value.transltions.size !== 0 ? "Translations" : "",
                                                        value.definitions_with_examples.size !== 0 ? "Definitions" : "",
                                                        value.examples ? "Examples" : ""
                                                    ].filter((value) => value !== "")
                                                }
                                                block
                                                defaultValue={selectedValue}
                                                onChange={(CurrentValue) => { setSelectedValue(CurrentValue as string) }}
                                                style={{ userSelect: "none" }}
                                            />
                                            {
                                                selectedValue === "Translations" ?
                                                    Array.from(value.transltions?.keys()).map((key) => {
                                                        return (
                                                            <React.Fragment key={key}>
                                                                <Paragraph style={{ color: "gray" }}>
                                                                    {key}
                                                                </Paragraph>
                                                                <Paragraph>
                                                                    {value.transltions.get(key)?.join(", ")}
                                                                </Paragraph>
                                                            </React.Fragment>
                                                        );
                                                    })
                                                    :
                                                    <></>
                                            }
                                            {
                                                selectedValue === "Definitions" ?
                                                    Array.from(value.definitions_with_examples?.keys()).map((key) => {
                                                        return (
                                                            <React.Fragment key={key}>
                                                                <Paragraph style={{ color: "gray" }}>
                                                                    {key}
                                                                </Paragraph>
                                                                {
                                                                    value.definitions_with_examples.get(key)?.map((definition, index) => {
                                                                        return (
                                                                            <div key={index} style={{ display: "grid", gridTemplateColumns: "30px auto" }}>
                                                                                <div style={{ padding: "4px" }}>{index + 1}</div>
                                                                                <div>
                                                                                    <Paragraph style={{ margin: 0 }}>{definition[0]}</Paragraph>
                                                                                    <Paragraph style={{ fontSize: "13px" }}>{definition[1] ? `"${definition[1]}"` : ""}</Paragraph>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })
                                                                }
                                                            </React.Fragment>
                                                        );
                                                    })
                                                    :
                                                    <></>
                                            }
                                            {
                                                selectedValue === "Examples" ?
                                                    value.examples?.map((value, index) => {
                                                        return (
                                                            <Paragraph key={index} style={{ margin: "10px" }}>
                                                                <span className="material-symbols-outlined" style={{ userSelect: "none" }}>
                                                                    format_quote
                                                                </span>
                                                                {`"${value.replaceAll(RegExp("(<b>)|(<\/b>)", "g"), "")}"`}
                                                            </Paragraph>
                                                        );
                                                    })
                                                    :
                                                    <></>
                                            }
                                        </div>
                                        :
                                        <></>
                                }
                                <Divider style={{ transition: "1s" }}>
                                    {
                                        isDataOpen ?
                                            <DoubleRightOutlined style={{ cursor: "pointer", transform: "rotate(-90deg)" }} onClick={() => setDataOpen(false)} />
                                            :
                                            <DoubleRightOutlined style={{ cursor: "pointer", transform: "rotate(90deg)" }} onClick={() => setDataOpen(true)} />
                                    }
                                </Divider>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", placeItems: "center" }}>
                                    <Button
                                        type="primary"
                                        onClick={() => { setSelectedValue("Translations"); setDataOpen(false); carouselRef.current?.next() }}
                                        size="small"
                                    >
                                        Repeat
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={() => { setSelectedValue("Translations"); setDataOpen(false); updateState(index) }}
                                        size="small"
                                    >
                                        Repeat after {` ${2 * value.state + 1} days`}
                                    </Button>
                                </div>
                            </div>
                        );
                    })
                }
            </Carousel>
    );
}
