import { React, useRef } from 'react';

function PageButton(props) {
  const {
    data,
    split,
    page,
    callBackPage,
    callBeckLoading,
  } = props;

  const countNewId = useRef(0)

  function getId() {
    countNewId.current++
    return countNewId.current
  };

  function buttonPageCallBack(i) {
    callBeckLoading(<div className="loading loading_center" key="loading-3"/>);
    callBackPage(i);
  };

  let listButton = [];

  if (data) {
    const lengthData = data.data.count;
    const lengthPage = Math.ceil(lengthData / split);

    if (lengthPage > 6) {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) {
          if (page === i) {
            listButton.push(
              <div key={getId()}>
                <button className='admin-page__window-namber-page admin-page__window-namber-page_active'>{i}</button>
              </div>
            );
          } else {
            listButton.push(
            <button 
              className='admin-page__window-namber-page'
              onClick={() => buttonPageCallBack(i)}
              key={getId()}
            >{i}</button>
          )};
        };

        listButton.push([
          <p className='admin-page__window-namber-page' key={getId()}>...</p>,
          <button 
            className='admin-page__window-namber-page' 
            onClick={() => buttonPageCallBack(lengthPage)}
            key={getId()}
          >{lengthPage}</button>
        ]);
      } else if (lengthPage - page < 3){
        listButton.push([
          <button 
            className='admin-page__window-namber-page'
            onClick={() => buttonPageCallBack(1)}
            key={getId()}
          >1</button>,
          <p className='admin-page__window-namber-page' key={getId()}>...</p>
        ]);
        
        for (let i = lengthPage - 3; i <= lengthPage; i++) {
          if (page === i) {
            listButton.push(
              <div key={getId()}>
                <button className='admin-page__window-namber-page admin-page__window-namber-page_active'>{i}</button>
              </div>
            );
          } else {
            listButton.push(
            <button 
              className='admin-page__window-namber-page'
              onClick={() => buttonPageCallBack(i)}
              key={getId()}
            >{i}</button>
          )};
        };
      } else {
        listButton.push([
          <button 
            className='admin-page__window-namber-page'
            onClick={() => buttonPageCallBack(1)}
            key={getId()}
          >{1}</button>,
          <p className='admin-page__window-namber-page' key={getId()}>...</p>,
          <button 
            className='admin-page__window-namber-page'
            onClick={() => buttonPageCallBack(page - 1)}
            key={getId()}
          >{page - 1}</button>,
          <div key={getId()}>
            <button className='admin-page__window-namber-page admin-page__window-namber-page_active'>{page}</button>
          </div>,
          <button 
            className='admin-page__window-namber-page'
            onClick={() => buttonPageCallBack(page + 1)}
            key={getId()}
          >{page + 1}</button>,
          <p className='admin-page__window-namber-page' key={getId()}>...</p>,
          <button 
            className='admin-page__window-namber-page'
            onClick={() => buttonPageCallBack(lengthPage)}
            key={getId()}
          >{lengthPage}</button>,
        ]);
      };
    } else {
      for (let i = 1; i <= lengthPage; i++) {
        if (page === i) {
          listButton.push(
            <div>
              <button className='admin-page__window-namber-page admin-page__window-namber-page_active' key={getId()}>{i}</button>
            </div>
          );
        } else {
          listButton.push(
          <button 
            className='admin-page__window-namber-page'
            onClick={() => buttonPageCallBack(i)}
            key={getId()}
          >{i}</button>
        )};
      };
    };
  };

  return (
    <div className='admin-page__window-namber'>
      <p className='admin-page__window-namber-page'>{'<<'}</p>
        {listButton}
      <p className='admin-page__window-namber-page'>{'>>'}</p>
    </div>
  );
};

export default PageButton;