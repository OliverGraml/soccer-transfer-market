import {useState} from 'react';
import styled from 'styled-components/macro';

export default function Tags({tags, onUpdateTags, onDeleteTag, onRemoveTag}) {
  const [tag, setTag] = useState('');

  function handleChange(event) {
    setTag(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      onUpdateTags(tag);
      setTag('');
    } else if (tag.length === 0 && event.key === 'Backspace') {
      onRemoveTag(tags.pop());
    }
  }

  return (
    <Wrapper>
      <label htmlFor="tag">Skills</label>
      <Tag>
        <TagCloud>
          {tags.map((tag, index) => (
            <>
              <span key={index + tag}>
                {tag}
                <button
                  onClick={() => {
                    onRemoveTag(tag);
                  }}
                >
                  x
                </button>
              </span>
            </>
          ))}
        </TagCloud>
        <input
          type="text"
          name="tag"
          value={tag}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </Tag>
    </Wrapper>
  );
}

const Tag = styled.section`
  display: inline-flex;
  flex-basis: content;
  //gap: 0.2rem;
  font-family: sans-serif;
  border: 3px groove green;
  //padding: 0.5rem;

  input {
    display: inline-flex;
    padding: 0;
    border: none;
    outline: none;
  }
  span {
    margin: 0.1rem;
    background: lightgreen;
    color: black;
    padding: 0.1rem;
    border-radius: 0.3rem;
    font-size: 0.8rem;
  }
  button {
    background: transparent;
    border: none;
    color: red;
    cursor: pointer;
  }
`;
const TagCloud = styled.article`
  display: inline-flex;
  flex-wrap: wrap;
`;

const Wrapper = styled.div`
  margin: 0.5rem;

  label {
    margin: 0.5rem;
  }
`;
