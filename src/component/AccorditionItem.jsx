// import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AccordionItem = ({ title, content, isActive, onClick }) => (
    <div className="border-b">
        <div
            className="flex items-center justify-between p-4 cursor-pointer"
            role="button"
            aria-expanded={isActive}
            onClick={onClick}
        >
            <span className="ml-2 font-medium">{title}</span>
            <span aria-hidden="true">
                {isActive ? (
                    <RemoveCircleIcon className='text-blue-500'/>
                ) : (
                    <AddCircleIcon/>
                )}
            </span>
        </div>
        <div
            className={`transition-all duration-300 ease overflow-hidden ${isActive ? 'max-h-screen' : 'max-h-0'}`}
            aria-hidden={!isActive}
        >
            <div className="p-4">
                <p>{content}</p>
            </div>
        </div>

        
    </div>
);

export default AccordionItem;