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
      primImage: undefined,
      secImages: undefined,
      description: '',
      ...productToEdit
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
      primImage: watch('primImage') as any,
      secImages: watch('secImages') as any,
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

  console.log(productToEdit);

  return (
    <Modal onClose={onClose}>
      <form className="modal-products" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="modal-pictures">
          {primImage ? (
            <img
              src={productToEdit ? primImage : URL.createObjectURL(primImage)}
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
                src={productToEdit ? secImages[index] : URL.createObjectURL(image)}
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
              placeholder='TItle' 
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
          <SubmitButton label="Delete" onClick={() => onDeleteHandler()} />
          <SubmitButton label="Save Changes" onClick={() => onSaveChangesHandler()} />
        </div>
          :
        <SubmitButton label="Create New" />
        }
      </form>
    </Modal>
  );
};

export default ModalProducts;