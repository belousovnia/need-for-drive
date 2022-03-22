import {React, useEffect} from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { getGeocoderPoint } from './dataFunction/dataStep1';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeFocus } from '../store/actions';
import { changeFocusList } from '../store/actions';
import { changePointMap } from '../store/actions';

function MyMap(props) {
  const { 
    pointMap, 
    changePointMap, 
    point, 
    focus, 
    changeFocus,
    focusList,
    changeFocusList, 
  } = props;

  let data = props.data;

  function checkPoint() {
    focusList.forEach((item) => {
      if (item[0].toUpperCase() == point.toUpperCase()) {
        changeFocus(item[1]);
      };
    });
  };

  async function buildingPoints() {
    const newData = await getGeocoderPoint(data);
    let responseData = [];
    let listPoint = [];

    newData.forEach((item) => {
      let coordinates = item.geocoderData.Point.pos;
      coordinates = coordinates.split(' ');
      coordinates = [coordinates[1], coordinates[0]];
      
      let newItem = <Placemark
        key={item.geocoderData.Point.pos} 
        defaultGeometry={coordinates}
        options={{      
          preset: 'islands#darkGreenCircleIcon'
        }}
      />

      listPoint.push([item.mainData.name, coordinates]);
      responseData.push(newItem);
    });

    changeFocusList(listPoint);
    changePointMap(responseData);
  };

  useEffect(() => {
    // buildingPoints();
    checkPoint();
  }, []);

  useEffect(() => {
    checkPoint();
  }, [focusList, point]);

  return ( 
    <YMaps
      query={{
      ns: 'use-load-option',
      load:
        'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
      }}
    >
        <Map 
          className='my-map'
          state={{
            center: focus,
            zoom: 15,
            controls: ['zoomControl', 'fullscreenControl'],
          }}
        >
          {pointMap}
        </Map>
    </YMaps>
  );
};

const putStateToProps = (state) => {
  return {
    pointMap: state.pointMap,
    point: state.point,
    focus: state.focus,
    focusList: state.focusList,
  };
};

const putActionToProps = (dispatch) => {
  return {
    changePointMap: bindActionCreators(changePointMap, dispatch),
    changeFocus: bindActionCreators(changeFocus, dispatch),
    changeFocusList: bindActionCreators(changeFocusList, dispatch),
  };
};

const WrappedMyMapComponent 
  = connect(putStateToProps, putActionToProps)(MyMap);

export default connect(putStateToProps, putActionToProps)(WrappedMyMapComponent);