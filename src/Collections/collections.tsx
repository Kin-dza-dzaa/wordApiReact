import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { GetWords } from '../api/words-calls';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Div } from './collections-styled';
import { Collection } from './collection/collection';
import { Outlet } from 'react-router-dom';


export const Words = (): JSX.Element => {
    const words = useQuery(["words"], GetWords, {retry: false});
    return (
        words.data ? 
            <Div>
                {
                    Array.from(words.data.keys()).map((key): JSX.Element => {
                        return <Collection key={key} CollectionName={key} TranslationData={words.data.get(key)!} />
                    })
                }
                <Outlet />
            </Div>
        : 
            <Div><Skeleton count={5} duration={1} baseColor="rgba(55, 55, 55, 1)" highlightColor="#444"/></Div> 
    )
}
