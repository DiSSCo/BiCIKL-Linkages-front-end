/* Import Icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


const SubmitButton = (props) => {
    const { searching } = props;

    return (
        <>
            {!searching ?
                <button className="query_formSubmit py-1 px-3 w-100"
                    type="submit"
                >
                    <FontAwesomeIcon icon={faSearch} className="query_searchIcon me-2" />

                    Search
                </button>
                :

                <button type="button"
                    className="query_formSubmit py-1 px-3 w-100"
                >
                    <span className="spinner-border spinner-border-sm me-2" />

                    Searching...
                </button>
            }
        </>
    );
}

export default SubmitButton;