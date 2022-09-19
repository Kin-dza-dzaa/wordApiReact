import React from 'react'
import { Div, StyledLink } from './collection-styled';
import { WordStruct } from '../../api/words-calls';

export const Collection = ({CollectionName, TranslationData}: {CollectionName: string, TranslationData: WordStruct[]}): JSX.Element => {
    return (
        <Div>
           <span>{CollectionName}</span>
           <p>Amount of words in collection: {TranslationData.length}</p>
           <StyledLink to={"collection/" + CollectionName}>asd</StyledLink>
        </Div>
    );
}
