import './section-header.css';

function SectionHeader(props) {
  return (
    <h2 className={ 'section-header ' + (props.addClasses || '') }>{ props.children }</h2>
  );
}

export default SectionHeader;
