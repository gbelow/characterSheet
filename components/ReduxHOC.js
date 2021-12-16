
import React from "react"

export const makeComponentWithSelector = (Component) => {
  return(
    ({id, selector, setChanger, ...props}) =>{
      const content = selector(id)
      const setContent=setChanger(id)
      return <Component {...props} content={content} setContent={setContent}  />
    }
  )  
}