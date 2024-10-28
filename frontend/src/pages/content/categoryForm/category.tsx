import CreateForm from './create';
import ShowForm from './show';
import '../../../styles/content.scss';

function Category() {
 
  return (
    <div className="category">
       <CreateForm/>
       <ShowForm/>
    </div>
  );
}

export default Category;