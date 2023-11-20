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
import { IProduct } from '../../entities/Product/product.models';

interface PropTypes {
  onClose?: () => void;
  onAddProduct?: (product: IProduct) => void;
  onDelete?: (product: IProduct) => void;
  productToEdit?: IProduct | null;
}

const validFileFormats = ['image/jpeg', 'image/jpg', 'image/png'];

const yupSchema = yup.object({
  price: yup.number().required('Price is required'),
  name: yup.string().required('Product name is required'),
  description: yup.string(),
  images: yup
    .mixed()
    .required('At least one image is required')
    .test('fileFormat', 'Invalid file format', (value: any) => {
      if (!value || value.length === 0) {
        return true;
      }
      return value.length <= 10 && Array.from(value).every((file: any) => validFileFormats.includes(file.type))
    })
    .test('minImages', 'You need to add at least 1 picture', (value: any) => {
      return !value || value.length > 0;
    })
    .test('maxImages', 'You can add maximum 9 additional pictures', (value: any) => {
      return !value || value.length <= 10;
    }),
});

type YupSchemaType = yup.InferType<typeof yupSchema>;

const ModalProducts = (props: PropTypes) => {
  const { onClose, onAddProduct, onDelete, productToEdit } = props;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm<YupSchemaType>({
    resolver: yupResolver(yupSchema),
    defaultValues: {
      price: 0,
      name: '',
      images: undefined,
      description: '',
      ...productToEdit
    },
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRefSmall = useRef<HTMLInputElement | null>(null);

  const images: any = watch('images') || [];

  const handleImagesChange = (files: FileList, isSmall: boolean = false) => {
    const currentSecImages: any = watch('images') || [];

    const updatedSecImages = isSmall
    ? [...currentSecImages.slice(0, 1), ...Array.from(files)]
    : [files[0], ...currentSecImages.slice(1)];

    setValue('images', updatedSecImages);
  };


  const onSubmitHandler: SubmitHandler<YupSchemaType> = async (data) => {
    try {
      const productData: IProduct = {
        images: data.images as any,
        name: data.name as string,
        price: Number(data.price),
        description: data.description as string,
      };
      onAddProduct && onAddProduct(productData);
    } catch (e) {
      console.log(e);
    }
  };
  
  const onDeleteHandler = () => {
    const productData: IProduct = {
      images: watch('images') as any,
      name: watch('name') as string,
      price: Number(watch('price')),
      description: watch('description') as string,
    };
    onDelete && onDelete(productData);
  };

  const onSaveChangesHandler = async () => {
    try {
      await handleSubmit(onSubmitHandler)();
      onClose && onClose(); 
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal onClose={onClose}>
      <form className="modal-products" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="modal-pictures">
          {images[0] ? (
            <img
              src={productToEdit ? images[0] : URL.createObjectURL(images[0])}
              alt="prim-img"
              className="prim-image"
            />
          ) : (
            <PlusButton
              bottomLabel="Add Cover"
              onClick={() => fileInputRef?.current?.click()}
            />
          )}
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={(e: any) => handleImagesChange(e.target.files, false)}
          />
          <div className="pictures-small">
            {Array.from(images).slice(1, 10).map((image: any, index: number) => (
              <img
                key={index}
                src={productToEdit ? images[index] : URL.createObjectURL(image)}
                alt="img-extra"
                className="img-extra"
              />
            ))}
            {images.length < 10 && (
              <PlusButton
                onClick={() => fileInputRefSmall?.current?.click()}
              />
            )}
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRefSmall}
              onChange={(e: any) => handleImagesChange(e.target.files, true)}
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
              {...register('name')}
              className='name-input' 
            />
          </div>
          <TextArea 
            placeholder='Description' 
            className='desc-input' 
            {...register('description')}
          />
        </div>
        {onDelete 
          ?
        <div className='modal-buttons'>
          <SubmitButton label="Delete" onClick={() => onDeleteHandler()} type="button" />
          <SubmitButton label="Save Changes" onClick={() => onSaveChangesHandler()} type="button" />
        </div>
          :
        <SubmitButton label="Create New" type="submit" />
        }
      </form>
    </Modal>
  );
};

export default ModalProducts;