
// components/OrderMap.js

import React, { useEffect, useRef, useState  } from 'react';
import mapboxgl from 'mapbox-gl';

// API accessToken for Mapbox
mapboxgl.accessToken = 'pk.eyJ1Ijoic3ByaW5nc3VtbWVyIiwiYSI6ImNtMnR2a3pwajA3MTEyaXExcWplMzZuaWYifQ.i9HjquSgUMs8qZGDxK2emw';


/**
 * Helped by chatGPT
 * Display the map according the order's current location that read from delivery API
 * Uses Mapbox Geocoding API to convert the location (e.g., address or place name) 
 *      into geographical coordinates (longitude and latitude).
 * Loads a custom marker image (marker_map_icon.png) to represent the location.
 */
const OrderMap = ({ location }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [coordinates, setCoordinates] = useState(null);


    useEffect(() => {
        // Use Mapbox Geocoding API tranfer the location to coordinates
        const fetchCoordinates = async () => {
        try {
            const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxgl.accessToken}`
            );
            const data = await response.json();

            // get coordinates from the first result
            if (data.features && data.features.length > 0) {
            const [lng, lat] = data.features[0].center;
            setCoordinates({ longitude: lng, latitude: lat });
            } else {
            console.error("Cannot find the coordinates for this location.");
            }
        } catch (error) {
            console.error("Geocoding error:", error);
        }
        };

        fetchCoordinates();
    }, [location]);


    useEffect(() => {
        if (!coordinates) return; // 如果坐标不存在，则返回

        // 打印坐标，确认是否获取到了正确的值
        console.log("Using coordinates:", coordinates);

        // 初始化或更新地图中心位置
        if (!map.current) {
            // 初始化地图
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [coordinates.longitude, coordinates.latitude], // 设置地图中心为坐标位置
                zoom: 10
            });
            
            map.current.on('load', () => {
                // 添加自定义图标（使用 URL 或内置 SVG）
                map.current.loadImage(
                    '/marker_map_icon.png', 
                    (error, image) => {
                        if (error) throw error;
                        if (!map.current.hasImage('custom-marker')) {
                            map.current.addImage('custom-marker', image);
                        }
    
                        // 添加图层，使用自定义图标
                        map.current.addSource('point', {
                            type: 'geojson',
                            data: {
                                type: 'FeatureCollection',
                                features: [
                                    {
                                        type: 'Feature',
                                        geometry: {
                                            type: 'Point',
                                            coordinates: [coordinates.longitude, coordinates.latitude],
                                        },
                                        properties: {},
                                    },
                                ],
                            },
                        });
    
                        map.current.addLayer({
                            id: 'custom-marker-layer',
                            type: 'symbol',
                            source: 'point',
                            layout: {
                                'icon-image': 'custom-marker', // 使用自定义图标
                                'icon-size': 0.1, // 调整图标大小
                                'icon-anchor': 'bottom', // 图标锚点
                            },
                        });

                    }
                );
            });

        } else {
            // 如果地图已经存在，更新地图的中心
            map.current.setCenter([coordinates.longitude, coordinates.latitude]);
        }

    }, [coordinates]);
    

    return (
        <div ref={mapContainer} className="w-full h-72 relative" />
    );
};

export default OrderMap;
