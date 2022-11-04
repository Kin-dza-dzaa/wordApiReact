import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DivCards } from './cards-styled';
import { GetWords } from '../../api/words-calls';
import { Collection } from './collection/collection';
import Divider from 'antd/lib/divider';
import { Button, Skeleton, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Modal } from 'antd'
import { AddCollection } from './add-collection';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/AuthProvider/useAuthContext';

const { Paragraph, Title } = Typography;

export const Cards = () => {
  const data = useQuery(["words"], GetWords, { retry: false });
  const [isOpen, setOpen] = useState(false);
  const authContext = useAuthContext();
  const navigation = useNavigate();
  useEffect(() => {
    if (!authContext.authState) {
        navigation("/home", {replace: true});
    }
  }, [])
  return (
    <React.Fragment>
      <DivCards style={{ userSelect: "none" }}>
        {
          data.isSuccess ?
            Array.from(data.data.keys()).map((key) => {
              return (
                <Collection key={key} words={data.data.get(key)!} collectionName={key} />
              );
            })
            :
            <></>
        }
      </DivCards>
      {
        data.isSuccess ?
          Array.from(data.data.keys()).length === 0 ?
            <React.Fragment>
              <Title level={3} style={{ "textAlign": "center" }}>You don't have any collections yet, try to add some!</Title>
              <Paragraph strong style={{ "textAlign": "center" }}>You can add a collection by clicking the button bellow. You need to enter name of a collection and add some inital words.</Paragraph>
            </React.Fragment>
            :
            <></>
          :
          <Skeleton active={true} paragraph={{ rows: 2 }} />
      }
      <Divider style={{ userSelect: "none" }} orientation="center">Add collection <Button type="primary" onClick={() => { setOpen(true) }} shape="circle" icon=<PlusOutlined /> /></Divider>
      {
        data.isSuccess ?
          <Modal
            open={isOpen}
            footer={false}
            onCancel={() => (setOpen(false))}
            destroyOnClose
            title="Add collection"
          >
            <AddCollection collections={Array.from(data.data.keys())} setOpen={setOpen} />
          </Modal>
          :
          <></>
      }
    </React.Fragment>
  );
}
