import React from 'react';
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';
import { productImagePost } from '../../../../../_actions/product';
import { useDispatch, useSelector } from 'react-redux';

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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Dropzone onDrop={onImageUpload}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: '300px',
              height: '240px',
              border: '1px solid lightgray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <PlusOutlined style={{ fontSize: '3rem', color: 'gray' }} />
          </div>
        )}
      </Dropzone>

      <div
        style={{
          display: 'flex',
          width: '350px',
          height: '240px',
          marginLeft: '1rem',
          overflowX: 'scroll',
          overflowY: 'hidden',
        }}
      >
        {/* {product &&
          product.images.map((image, index) => (
            <div key={index}>
              <img
                style={{
                  minWidth: '300px',
                  width: '300px',
                  height: '240px',
                }}
                src={image.filePath}
                alt=''
              />
            </div>
          ))} */}
      </div>
    </div>
  );
};

export default FileUpload;
