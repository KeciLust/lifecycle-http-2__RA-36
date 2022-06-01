import React from 'react'
import PropTypes from 'prop-types'

function Note(props) {
  const { item } = props;
  const { func } = props;
  return (<div className='note' >
    <span className='noteSpan' >{item.content}</span>
    <button className='noteSpanButton' id={item.id} onClick={func}>&#10060;</button>
  </div>
  )
}

Note.propTypes = {
  item: PropTypes.object.isRequired,
}

export default Note