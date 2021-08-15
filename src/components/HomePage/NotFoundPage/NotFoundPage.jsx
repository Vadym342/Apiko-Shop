
import st from './NotFoundPage.module.css'

const NotFoundPage = (props) => {
    return (
        <div>
            {
                props.notFound ?
                    <div>
                        <h3>
                            No Results Found
                        </h3>
                        <h4>
                            We did not find any article that matches this search
                            Make sure that the search text is entered correctly
                            Try using other search criteria
                        </h4>
                    </div>
                    : ""
            }
            {
                props.notFoundCategory ?
                    <h3>
                        No items in this category yet
                    </h3>
                    : ""
            }
        </div>
    )
}
export default NotFoundPage