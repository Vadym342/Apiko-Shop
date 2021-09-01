import { useDispatch, useSelector } from "react-redux";
import { favoriteListSelector, getFavoriteList } from "../../../store";
import st from './Favorite.module.css';
import Profile from "../Profile"
import { useEffect } from "react";
import ProductListRender from "../../ProductList/ProductList";
import { useState } from "react";
import ProductDesc from "../../ProductList/ProductDesc/ProductDesc";


const Favorites = () => {
    const dispatch = useDispatch();
    const favoriteList = useSelector(favoriteListSelector);
    const [selectedSingleItem, setSelectedSingleItem] = useState(null);

    const handleFavoriteList = () => {
        dispatch(getFavoriteList());
    }
    useEffect(() => {
        handleFavoriteList()
    }, [favoriteList]);

    return (
        <div className={st.editBlock}>
            <div className={st.mainContent}>
                <div>
                    <Profile />
                </div>
                <div className={st.cardList}>
                    {
                        favoriteList.map(item => (
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
                </div>
                {
                    selectedSingleItem && (
                        <ProductDesc item={selectedSingleItem}
                            closePopUp={() => setSelectedSingleItem(null)}
                        />
                    )
                }
            </div>
        </div>
    )
}
export default Favorites