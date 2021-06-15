import React from 'react';
import Dropzone from 'react-dropzone';
import { Button } from 'antd';
import {
  productImageEditPost,
  editProductImageRemove,
} from '../../../../../_actions/product';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div``;

const ImageUploadBtn = styled(Button)`
  margin-top: 1rem;
`;

const PreviewBox = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  margin-left: 1rem;
  overflow-x: scroll;
  overflow-y: hidden;

  img {
    height: 240px;
  }
`;

const EditFileUpload = () => {
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product);

  const onImageEditUpload = (files) => {
    // 파일을 서버에 전송하기위한것
    const formData = new FormData();

    formData.append('file', files[0]);

    dispatch(productImageEditPost(formData));
  };

  const onEditImageRemove = (images, image) => {
    dispatch(editProductImageRemove(images, image));
  };

  return (
    <Container>
      {product.product &&
        product.product.images &&
        product.product.images.length !== 0 && (
          <PreviewBox>
            {product.product.images &&
              product.product.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() =>
                    onEditImageRemove(product.product.images, image)
                  }
                  style={{ cursor: 'pointer' }}
                >
                  <img src={`http://localhost:5000/${image}`} alt='' />
                </div>
              ))}
          </PreviewBox>
        )}

      <Dropzone onDrop={onImageEditUpload}>
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

export default EditFileUpload;
