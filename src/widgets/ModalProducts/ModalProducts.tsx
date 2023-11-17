import React, { useRef } from 'react';
import './ModalProducts.scss';
import Modal from '../../shared/components/Modal/Modal';
import FormInput from '../../shared/components/Input/FormInput/FormInput';
import SubmitButton from '../../shared/components/Button/SubmitButton/SubmitButton';
import PlusButton from '../../shared/components/Button/PlusButton/PlusButton';
import TextArea from '../../shared/components/TextArea/TextArea';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IProduct } from '../../shared/types/types';

interface PropTypes {
  onClose?: () => void;
  onAddProduct?: (product: IProduct) => void;
}

const validFileFormats = ['image/jpeg', 'image/jpg', 'image/png'];

const yupSchema = yup.object({
  price: yup.number().required('Price is required'),
  title: yup.string().required('Product name is required'),
  desc: yup.string(),
  primImage: yup
    .mixed()
    .required('Primary image is required')
    .test('fileFormat', 'Invalid file format', (value: any) => {
    if (!value) return false; 
    return validFileFormats.includes(value.type);
  }),
  secImages: yup
    .mixed()
    .test('fileFormat', 'Invalid file format', (value: any) => {
      if (!value || value.length === 0) {
        return true;
      }
      return value.length <= 9 && Array.from(value).every((file: any) => validFileFormats.includes(file.type))
    })
    .test('maxImages', 'You can add maximum 9 additional pictures', (value: any) => {
      return !value || value.length <= 9;
    }),
});

type YupSchemaType = yup.InferType<typeof yupSchema>;

const ModalProducts = (props: PropTypes) => {
  const { onClose, onAddProduct } = props;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<YupSchemaType>({
    resolver: yupResolver(yupSchema),
    defaultValues: {
      price: 0,
      title: '',
      primImage: undefined,
      secImages: undefined,
      desc: '',
    },
  });

  const fileInputRefPrim = useRef<HTMLInputElement | null>(null);
  const fileInputRefSec = useRef<HTMLInputElement | null>(null);

  const primImage: any = watch('primImage');
  const secImages: any = watch('secImages') || [];

  const handlePrimImageChange = (file: File) => {
    setValue('primImage', file);
  };

  const handleSecImagesChange = (files: FileList) => {
    const currentSecImages: any = watch('secImages') || [];

    const updatedSecImages = [...currentSecImages, ...Array.from(files)];
  
    setValue('secImages', updatedSecImages);
  
  };


  const onSubmitHandler: SubmitHandler<YupSchemaType> = async (data) => {
    try {
      const productData: IProduct = {
        primImage: data.primImage as any, 
        secImages: data.secImages as any,
        title: data.title as string,
        price: Number(data.price),
        desc: data.desc as string,
      };
      onAddProduct && onAddProduct(productData);
    } catch (e) {
      console.log(e);
    }
  };
  

  return (
    <Modal onClose={onClose}>
      <form className="modal-products" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="modal-pictures">
          {primImage ? (
            <img
              src={URL.createObjectURL(primImage)}
              alt="prim-img"
              className="prim-image"
            />
          ) : (
            <PlusButton
              bottomLabel="Add Cover"
              onClick={() => fileInputRefPrim?.current?.click()}
            />
          )}
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRefPrim}
            onChange={(e: any) => handlePrimImageChange(e.target.files && e.target.files[0])}
          />
          <div className="pictures-small">
            {Array.from(secImages).slice(0, 9).map((image: any, index: number) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt="img-extra"
                className="img-extra"
              />
            ))}
            {secImages.length < 9 && (
              <PlusButton
                onClick={() => fileInputRefSec?.current?.click()}
              />
            )}
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRefSec}
              onChange={(e:any) => handleSecImagesChange(e.target.files)}
              multiple
            />
          </div>
        </div>
        <div className="modal-inputs">
          <div className="inputs-main">
            <FormInput 
              placeholder='Price' 
              {...register('price')}
              className='price-input' 
            />
            <FormInput 
              placeholder='Title' 
              {...register('title')}
              className='title-input' 
            />
          </div>
          <TextArea 
            placeholder='Description' 
            className='desc-input' 
            {...register('desc')}
          />
        </div>
        <SubmitButton label="Create New" />
      </form>
    </Modal>
  );
};

export default ModalProducts;