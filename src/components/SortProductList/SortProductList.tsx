import React, { useState } from 'react'
import { sortBy, order as orderConstant } from 'src/constants/product'
import classNames from 'classnames'
import { ProductListComfig } from 'src/types/product.type'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import omit from 'lodash/omit'
import { Category } from 'src/types/category.type'
import { QueryConfigS } from 'src/hooks/useQueryConfig'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

interface Props {
  categories: Category[]
  queryConfig: QueryConfigS
}
const SortProductList = ({ categories, queryConfig }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const [moreOt, setMoreOt] = useState(false)
  const { category } = queryConfig
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()
  const isActiveSortBy = (sortByValue: Exclude<ProductListComfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }
  const handleSort = (sortByValue: Exclude<ProductListComfig['sort_by'], undefined>) => {
    navigate({
      pathname: '/product',
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListComfig['order'], undefined>) => {
    navigate({
      pathname: '/product',
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }
  const handleSearchByCategory = (categoryValue: string) => {
    navigate({
      pathname: '/product',
      search: createSearchParams({
        ...queryConfig,
        category: categoryValue
      }).toString()
    })
  }

  const handlerRemoveAll = () => {
    navigate({
      pathname: '/product',
      search: createSearchParams(omit(queryConfig, ['category', 'name'])).toString()
    })
    setMoreOt(false)
  }

  return (
    <section className={`mb-7 pr-10`}>
      <div className='flex justify-between mobile:flex-col mobile:gap-y-[15px] mobile:items-center'>
        <div className='flex gap-[20px]'>
          <button
            className={classNames('p-2 text-white rounded-[10px] ', {
              'bg-secondary': isActiveSortBy(sortBy.countInStock),
              'bg-bgPrimary': !isActiveSortBy(sortBy.countInStock),
              'hover:opacity-90': !isActiveSortBy(sortBy.countInStock)
            })}
            onClick={() => handleSort(sortBy.countInStock)}
          >
            Ph??? bi???n
          </button>
          <button
            className={classNames('p-2 text-white rounded-[10px] hover:opacity-90', {
              'bg-secondary': isActiveSortBy(sortBy.createdAt),
              'bg-bgPrimary': !isActiveSortBy(sortBy.createdAt),
              'hover:opacity-90': !isActiveSortBy(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            M???i nh???t
          </button>
          <button
            className={classNames('p-2 text-white rounded-[10px] hover:opacity-90', {
              'bg-secondary': isActiveSortBy(sortBy.selled),
              'bg-bgPrimary': !isActiveSortBy(sortBy.selled),
              'hover:opacity-90': !isActiveSortBy(sortBy.selled)
            })}
            onClick={() => handleSort(sortBy.selled)}
          >
            B??n ch???y
          </button>
        </div>
        <div>
          <select
            className={classNames('py-2 px-4 text-white rounded-[10px]', {
              'bg-secondary': isActiveSortBy(sortBy.price),
              'text-black': !isActiveSortBy(sortBy.price),
              border: !isActiveSortBy(sortBy.price),
              'hover:opacity-90': !isActiveSortBy(sortBy.price)
            })}
            value={order || ''}
            onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListComfig['order'], undefined>)}
          >
            <option className='text-black bg-white' value='' disabled>
              Gi??
            </option>
            <option className='text-black bg-white' value={orderConstant.asc}>
              Th???p ?????n cao
            </option>
            <option className='text-black bg-white' value={orderConstant.desc}>
              Cao ?????n th???p
            </option>
          </select>
        </div>
      </div>
      <div className={`${moreOt ? 'block' : 'hidden'} mt-4 flex justify-between`}>
        <div className='flex gap-3 text-center items-center '>
          {categories.map((item) => {
            const isActive = category === item._id
            return (
              <button
                onClick={() => handleSearchByCategory(item._id as string)}
                key={item._id}
                className={classNames('', {
                  'text-secondary': isActive
                })}
              >
                {item.name}
              </button>
            )
          })}
        </div>
        <button onClick={() => handlerRemoveAll()} className='bg-red-300 hover:opacity-90 rounded-lg p-2 text-white'>
          Xo?? b??? l???c
        </button>
      </div>
      <div className='flex justify-center mt-2'>
        <button onClick={() => setMoreOt(!moreOt)} className='p-2 shadow-lg hover:shadow-md rounded-md'>
          {moreOt ? '????ng' : 'Th??m b??? l???c'}
        </button>
      </div>
    </section>
  )
}

export default SortProductList
