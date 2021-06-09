import React from 'react';
import Dropzone from 'react-dropzone';
import { Button } from 'antd';
import { productImagePost } from '../../../../../_actions/product';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div``;

const ImageUploadBtn = styled(Button)`
  margin-top: 1rem;
`;

const PreviewBox = styled.div`
  display: flex;
  width: 1024px;
  height: auto;
  margin-left: 1rem;
  overflow-x: scroll;
  overflow-y: hidden;

  img {
    height: 240px;
    /* min-width: 300px;
    width: 300px;
    height: 240px; */
  }
`;

const FileUpload = () => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const onImageUpload = (files) => {
    // 파일을 서버에 전송하기위한것
    const formData = new FormData();

    formData.append('file', files[0]);

    dispatch(productImagePost(formData));
  };

  return (
    <Container>
      {product && product.images && product.images.length !== 0 && (
        <PreviewBox>
          {product &&
            product.images &&
            product.images.map((image, index) => (
              <div key={index}>
                <img src={`http://localhost:5000/${image}`} alt='' />
              </div>
            ))}
        </PreviewBox>
      )}
      <Dropzone onDrop={onImageUpload}>
        {({ getRootProps, getInputProps }) => (
          <ImageUploadBtn {...getRootProps()}>
            업로드
            <input {...getInputProps()} />
            {/* <PlusOutlined style={{ fontSize: '3rem', color: 'gray' }} /> */}
          </ImageUploadBtn>
        )}
      </Dropzone>
    </Container>
  );
};

export default FileUpload;
