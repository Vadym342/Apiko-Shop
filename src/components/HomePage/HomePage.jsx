import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { categoriesSelector, fetchCategories, fetchProductList, getProductsByCategoryId, isLoaderSelector, isNotificationPopUpSelector, notFoundCategory, notFoundCategorySelector, notFoundSelector, productListSelector, searchItem, setCloseModal, userSelector } from '../../store';
import st from './HomePage.module.css'
import ProductListRender from '../ProductList/ProductList';
import ProductDesc from '../ProductList/ProductDesc/ProductDesc';
import { debounce } from "debounce";
import NotFoundPage from './NotFoundPage/NotFoundPage';
import NotificationPopUp from '../NotificationPopUp/NotificationPopUp';
import Pagination from '../Pagination/Pagination';


const HomePage = () => {
    const dispatch = useDispatch();
    const productList = useSelector(productListSelector);
    const categories = useSelector(categoriesSelector);
    const [selectedSingleItem, setSelectedSingleItem] = useState(null);
    const debounceOnChange = useCallback(debounce(onChange, 300), []);
    const notFound = useSelector(notFoundSelector);
    const notFoundCategory = useSelector(notFoundCategorySelector);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedSort, setSelectedSort] = useState("latest");
    const [empty, setEmpty] = useState("");
    const isLoader = useSelector(isLoaderSelector);
    const isNotificationPopUp = useSelector(isNotificationPopUpSelector);


    function onChange(value) {
        if (value === "") {
            setEmpty("Empty");
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
    useEffect(() => {
        handleFetchProductList({ category: selectedCategory, sortBy: selectedSort });
        handleFetchCategoties();
    }, [selectedSort, empty])

    const handleSelectedCategory = (selectedCategory) => {
        dispatch(getProductsByCategoryId(selectedCategory))
    }

    useEffect(() => {
        handleSelectedCategory({ category: selectedCategory, sortBy: selectedSort });
    }, [selectedCategory, selectedSort])

    return (
        <div className={isLoader ? st.blur : st.mainContent}>
            <div className={st.blockCategory}>
                <div>
                    <input className={st.inputSearch} placeholder="Search products by name" onChange={e => debounceOnChange(e.target.value)} />
                </div>
                <div>
                    <select className={st.selectCategory} defaultValue="Choose Category" onChange={e => setSelectedCategory(e.target.value)}>
                        <option value="1">All</option>
                        {
                            categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
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
                        productList.map(item => (
                            <ProductListRender
                                key={item.id}
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
                isNotificationPopUp ? <NotificationPopUp
                /> : ""
            }
        </div>
    );
}

export default HomePage