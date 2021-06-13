import React from 'react';
import Dropzone from 'react-dropzone';
import { Button } from 'antd';
import {
  productImagePost,
  productImageRemove,
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

const FileUpload = () => {
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product);

  const onImageUpload = (files) => {
    // 파일을 서버에 전송하기위한것
    const formData = new FormData();

    formData.append('file', files[0]);

    dispatch(productImagePost(formData));
  };

  const onImageRemove = (images, image) => {
    dispatch(productImageRemove(images, image));
  };

  return (
    <Container>
      {/* Edit페이지에서 이미지 불러옴 및 활성화됨 */}
      {product.product &&
        product.product.images &&
        product.product.images.length !== 0 && (
          <PreviewBox>
            {product.product.images &&
              product.product.images.map((image, index) => (
                <div key={index}>
                  <img src={`http://localhost:5000/${image}`} alt='' />
                </div>
              ))}
          </PreviewBox>
        )}

      {/* 일반 업로드 페이지에서 이미지 업로드시 이미지 불러옴 및 활성화됨 */}
      {product && product.images && product.images.length !== 0 && (
        <PreviewBox>
          {product &&
            product.images &&
            product.images.map((image, index) => (
              <div
                key={index}
                onClick={() => onImageRemove(product.images, image)}
              >
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
