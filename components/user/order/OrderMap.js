
// components/OrderMap.js

import React, { useEffect, useRef, useState  } from 'react';
import mapboxgl from 'mapbox-gl';

// 设置 Mapbox 的 API 密钥
mapboxgl.accessToken = 'pk.eyJ1Ijoic3ByaW5nc3VtbWVyIiwiYSI6ImNtMnR2a3pwajA3MTEyaXExcWplMzZuaWYifQ.i9HjquSgUMs8qZGDxK2emw';

const OrderMap = ({ location }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [coordinates, setCoordinates] = useState(null);


    useEffect(() => {
        // 使用 Mapbox Geocoding API 将地址转换为经纬度
        const fetchCoordinates = async () => {
        try {
            const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxgl.accessToken}`
            );
            const data = await response.json();

            // 检查响应并提取第一个结果的坐标
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
            
            // 添加标记和弹出窗口
            const marker = new mapboxgl.Marker({ color: "red" })
                .setLngLat([coordinates.longitude, coordinates.latitude])
                .addTo(map.current);

            const popup = new mapboxgl.Popup({ offset: 15 })
                .setLngLat([coordinates.longitude, coordinates.latitude])
                .setHTML(`<h3>Current Location</h3><p>${location}</p>`)
                .addTo(map.current);

            // 清理标记和弹出窗口（如果组件卸载）
            return () => {
                marker.remove();
                popup.remove();
            };
        } else {
            // 如果地图已经存在，更新地图的中心
            map.current.setCenter([coordinates.longitude, coordinates.latitude]);
        }

    }, [coordinates]);

    return (
        <div ref={mapContainer} className="w-full h-64 mt-6" />
    );
};

export default OrderMap;
