import React from 'react'
import { Offcanvas, OffcanvasHeader, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/shoppingCartContext'
import { formatCurrency } from '../utilities/formatCurrency'
import CartItem from './CartItem';
import storeItems from '../data/items.json'

type Props = {}

const ShoppingCart = (props: Props) => {
  const {isOpen,cartItems, closeCart} = useShoppingCart()
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
      <OffcanvasHeader closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </OffcanvasHeader>
      <Offcanvas.Body>
        <Stack gap={3}>
          {
            cartItems.map(item =>   
              <CartItem key={item.id} {...item}/>
              )
          }
          <div className='ms-auto fw-bold fs-5'>
            Total {formatCurrency(cartItems.reduce((total, cartItem)=>{
              const item = storeItems.find(i => i.id === cartItem.id)
              return total + (item?.price) * cartItem.quantity
            }, 0))}

          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>

  )
}

export default ShoppingCart