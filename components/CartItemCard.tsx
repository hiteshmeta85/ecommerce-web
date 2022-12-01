import React, {useState} from 'react';
import SelectInput from "./SelectInput";
import {CartItem} from "../lib/types";

function CartItemCard(props: CartItem) {
  const {id, quantity, product_id, user_id, product, created_at, updated_at} = props

  const [selectedQuantity, setSelectedQuantity] = useState<number>(quantity)

  const productRange = Array.from(Array(product.quantity).keys())
    .map((x) => {
      return {key: x + 1, value: x + 1}
    })

  return (
    <>
      <div>
        <a href={`/products/${product.id}`} className='text-blue-500'>{product.name}</a>
        <p className='truncate'>{product.description}</p>
        {product.quantity > quantity ?
          <SelectInput
            type={'number'}
            label={'Quantity: '}
            value={selectedQuantity}
            setState={setSelectedQuantity}
            options={productRange}
            isRequired={true}
            shouldSaveItToDatabase={true}
          /> : <p className="text-red-500 text-sm">Currently Unavailable</p>}
      </div>
      <hr className="my-4"/>
    </>
  );
}

export default CartItemCard;
