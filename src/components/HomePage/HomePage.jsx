import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import {
    cartArraySelector, cartBubbleSelector, categoriesSelector,
    fetchCategories, fetchProductList, getProductsByCategoryId, getUser,
    isGuestPopUpSelector, isLoaderSelector, notFoundCategorySelector, notFoundSelector,
    offsetSelector, productListSelector, searchItem, 
    setCartArray, setCartBubble, setOffset, setOrderList, setProductList, userSelector
} from '../../store';
import st from './HomePage.module.css'
import ProductListRender from '../ProductList/ProductList';
import ProductDesc from '../ProductList/ProductDesc/ProductDesc';
import { debounce } from 'debounce';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import Pagination from '../Pagination/Pagination';
import GuestPopUp from '../Authorization/GuestPopUp/GuestPopUp';
import iconSearch from '../../Icons/iconSearch.svg';
import iconCategory from '../../Icons/iconCategory.svg';
import iconSorting from '../../Icons/iconSorting.svg';
import { useHistory } from 'react-router-dom';


const HomePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(userSelector);
    const productList = useSelector(productListSelector);
    const categories = useSelector(categoriesSelector);
    const [selectedSingleItem, setSelectedSingleItem] = useState(null);
    const debounceOnChange = useCallback(debounce(onChange, 300), []);
    const notFound = useSelector(notFoundSelector);
    const notFoundCategory = useSelector(notFoundCategorySelector);
    const [selectedCategory, setSelectedCategory] = useState(-1);
    const [selectedSort, setSelectedSort] = useState("latest");
    const [empty, setEmpty] = useState(false);
    const isLoader = useSelector(isLoaderSelector);
    const offset = useSelector(offsetSelector);
    const isGuestPopUp = useSelector(isGuestPopUpSelector);
    const cartArray = useSelector(cartArraySelector);
    const cartBubble = useSelector(cartBubbleSelector);

    function onChange(value) {
        if (value === "") {
            setEmpty(true);
        } else {
            dispatch(searchItem(value));
        }
    }

    const handleFetchProductList = (selectedSort) => {
        dispatch(fetchProductList(selectedSort));
    }
    const handleFetchCategoties = () => {
        dispatch(fetchCategories());
    }
    const handleSelectedCategory = (selectedCategory) => {
        dispatch(setProductList([]));
        dispatch(getProductsByCategoryId(selectedCategory))
    }
    const handleSetSelectedCategory = (e) => {
        setSelectedCategory(e.target.value);
        dispatch(setOffset(0));
    }
    // useEffect(() => {
    //     handleFetchProductList({ category: selectedCategory, sortBy: selectedSort });
    //     handleFetchCategoties();
    // }, [selectedSort, empty, offset])
    // useEffect(()=>{
    //     sessionStorage.setItem('cartBubble',cartBubble);
    //     sessionStorage.setItem('cartArray',cartArray);
    // },[cartArray])
    useEffect(() => {
        dispatch(setProductList([]));
        handleFetchProductList({ category: selectedCategory, sortBy: selectedSort });
        handleFetchCategoties();
    }, [user, selectedSort, offset])
    useEffect(() => {
        handleSelectedCategory({ category: selectedCategory, sortBy: selectedSort });
    }, [selectedCategory, selectedSort, offset])

    useEffect(() => {
        // if (sessionStorage.getItem('orderList')) {
        //     dispatch(setCartArray(JSON.parse(sessionStorage.getItem('cartArray'))))
        //     dispatch(setCartBubble(JSON.parse(sessionStorage.getItem('cartBubble'))))
        //     dispatch(setOrderList(JSON.parse(sessionStorage.getItem('orderList'))));
        // }
        const headers = {
            'accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
        }
        dispatch(getUser(headers));
        history.push('/');

    }, []);
    return (
        <div className={isLoader ? st.blur : st.mainContent}>
            <div className={st.blockCategory}>
                <div className={st.inputContainer}>
                    <img src={iconSearch} alt={iconSearch} />
                    <input className={st.inputSearch} placeholder="Search products by name" onChange={e => debounceOnChange(e.target.value)} />
                </div>
                <div className={st.inputContainer}>
                    <img src={iconCategory} alt={iconCategory} />
                    <select className={st.selectCategory} defaultValue="Choose Category" onChange={e => handleSetSelectedCategory(e)}>
                        <option value="1">All</option>
                        {
                            categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={st.inputContainer}>
                    <img src={iconSorting} alt={iconSorting} />
                    <select className={st.selectSort} defaultValue="Sorting" onChange={e => setSelectedSort(e.target.value)}>
                        <option disabled hidden>Sorting</option>
                        <option value="popular">Popular</option>
                        <option value="latest">Latest</option>
                    </select>
                </div>
            </div>
            <div className={st.cardList}>
                {
                    notFound || notFoundCategory ? <NotFoundPage notFound={notFound} notFoundCategory={notFoundCategory} /> :
                        productList.map((item, index) => (
                            <ProductListRender
                                key={index}
                                selectedSingleItem={selectedSingleItem}
                                closePopUp={() => setSelectedSingleItem(null)}
                                openSingleItem={setSelectedSingleItem}
                                {...item}
                                item={item}
                            />
                        ))
                }
                <div className={st.paginationButton}>
                    <Pagination />
                </div>
            </div>
            {
                selectedSingleItem && (
                    <ProductDesc item={selectedSingleItem}
                        closePopUp={() => setSelectedSingleItem(null)}
                    />
                )
            }
            {
                isGuestPopUp ? <GuestPopUp /> : ""
            }
        </div>
    );
}

export default HomePage