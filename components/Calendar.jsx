import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

// Получаем текущий месяц
const getCurrentMonth = () => {
  const now = new Date();
  return now.getMonth(); // Возвращаем реальный текущий месяц
};

// Названия месяцев
// Показываем 6 месяцев так, чтобы текущий был предпоследним
const getDisplayMonths = () => {
  const currentMonth = getCurrentMonth(); // август = 7
  const startMonth = Math.max(0, currentMonth - 4); // начинаем так, чтобы текущий был 5-м (предпоследним)
  const months = [];
  
  // Показываем 6 месяцев: текущий будет 5-м, следующий 6-м
  for (let i = 0; i < 7; i++) { // 7 месяцев чтобы показать и следующий
    const monthIndex = (startMonth + i) % 12;
    months.push({
      name: MONTH_NAMES[monthIndex],
      index: monthIndex,
      isActive: monthIndex === currentMonth
    });
  }
  
  return months.slice(0, 6); // Берем только первые 6 для отображения
};

const MONTH_NAMES = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const MONTH_NAMES_RU = ['ЯНВАРЬ', 'ФЕВРАЛЬ', 'МАРТ', 'АПРЕЛЬ', 'МАЙ', 'ИЮНЬ', 'ИЮЛЬ', 'АВГУСТ', 'СЕНТЯБРЬ', 'ОКТЯБРЬ', 'НОЯБРЬ', 'ДЕКАБРЬ'];

export default function Calendar() {
  const currentMonth = getCurrentMonth();
  const currentYear = new Date().getFullYear();
  const displayMonths = getDisplayMonths();
  const activeIndexInDisplay = displayMonths.findIndex(m => m.isActive);

  // ДАННЫЕ ГРАФИКА: Значения по месяцам (приходят с бекенда)
  const backendValues = [88,70,88,5,88,70]; // Пример: данные с бекенда
  
  // Подготавливаем данные для графика (всегда 6 значений)
  let chartValues;
  
  if (backendValues.length > 6) {
    // Если данных больше 6 - берем последние 6 значений (отрезаем начало)
    chartValues = backendValues.slice(-6);
  } else if (backendValues.length < 6) {
    // Если данных меньше 6 - дополняем В НАЧАЛО до 6 значений
    chartValues = [...backendValues];
    while (chartValues.length < 6) {
      const lastValue = backendValues[backendValues.length - 1]; // Берем ПОСЛЕДНЕЕ значение из исходных данных
      const variation = lastValue * 0.2; // ±20% от последнего значения
      const newValue = Math.round(lastValue + (Math.random() - 0.5) * variation * 2);
      chartValues.unshift(Math.max(10, newValue)); // Добавляем В НАЧАЛО массива
    }
  } else {
    // Если данных ровно 6 - используем как есть
    chartValues = [...backendValues];
  }
  
  // АКТИВНОЕ ЗНАЧЕНИЕ: Показываем последнее значение из исходных данных с бекенда
  const activeValue = backendValues[backendValues.length - 1]; // Сегодняшние данные

  // Создаем SVG путь для графика
  const createChartPath = () => {
    const width = screenWidth - 88;
    const height = 120;

    // Используем дополненные значения для графика
    const maxVal = Math.max(...chartValues);
    const padding = 20;

    // Переводим в координаты все точки
    const points = chartValues.map((v, i) => {
      const x = (i / (chartValues.length - 1)) * (width - padding * 2) + padding;
      const y = height - ((v / maxVal) * (height - padding * 2) + padding);
      return { x, y };
    });

    // Для рисования берем точки до активного месяца + промежуточная точка до середины следующего
    const chartPoints = points.slice(0, Math.min(activeIndexInDisplay + 1, points.length));
    
    // Добавляем промежуточную точку до середины MAY (между APR и MAY)
    if (activeIndexInDisplay < points.length - 1 && activeIndexInDisplay < 5) {
      const currentPoint = points[activeIndexInDisplay];
      const nextPoint = points[activeIndexInDisplay + 1];
      const midPoint = {
        x: currentPoint.x + (nextPoint.x - currentPoint.x) * 0.3,
        y: currentPoint.y + (nextPoint.y - currentPoint.y) * 0.3
      };
      chartPoints.push(midPoint);
    }

    // Создаем SVG путь
    if (chartPoints.length === 0) return '';
    
    let pathData = `M ${chartPoints[0].x} ${chartPoints[0].y}`;
    
    for (let i = 0; i < chartPoints.length - 1; i++) {
      const xc = (chartPoints[i].x + chartPoints[i + 1].x) / 2;
      const yc = (chartPoints[i].y + chartPoints[i + 1].y) / 2;
      pathData += ` Q ${chartPoints[i].x} ${chartPoints[i].y} ${xc} ${yc}`;
    }

    return { pathData, activePoint: points[Math.min(activeIndexInDisplay, points.length - 1)] };
  };

  const { pathData, activePoint } = createChartPath();
  
  return (
    <View style={styles.calendar}>
      <LinearGradient
        colors={['#005cff', '#0ad3ff']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Навигация месяцев */}
        <View style={styles.months}>
          {displayMonths.map((month, index) => {
            const isActive = month.isActive;
            
            if (isActive) {
              return (
                <View key={month.name} style={styles.activeMonthContainer}>
                  <LinearGradient
                    colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0)']}
                    style={styles.activeMonthBackground}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                  />
                  <Text style={[styles.monthText, styles.activeMonth]}>{month.name}</Text>
                </View>
              );
            }
            
            return (
              <Text key={month.name} style={styles.monthText}>{month.name}</Text>
            );
          })}
        </View>

        {/* Сумма */}
        <Text style={styles.amount}>$4153.93</Text>
        <Text style={styles.subtext}>{MONTH_NAMES_RU[currentMonth]} {currentYear}</Text>

        {/* График */}
        <View style={styles.chart}>
          <Svg width={screenWidth - 88} height={120} style={styles.svg}>
            <Path
              d={pathData}
              stroke="#fff"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          {/* Точка */}
          <View 
            style={[
              styles.point,
              {
                left: activePoint?.x || 0,
                top: (activePoint?.y || 0) + 9,
              }
            ]} 
          />
          {/* Лейбл */}
          <View 
            style={[
              styles.label,
              {
                left: activePoint?.x || 0,
                top: activePoint?.y || 0,
              }
            ]}
          >
            <Text style={styles.labelText}>${activeValue}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: {
    width: screenWidth - 48,
    height: 200,
    borderRadius: 20,
    marginHorizontal: 'auto',
    marginVertical: 20,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    padding: 30,
    position: 'relative',
  },
  months: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    position: 'relative',
  },
  monthText: {
    fontSize: 14,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.6)',
    fontFamily: 'Codec-Pro-Bold',
    fontWeight: 'bold',
  },
  activeMonthContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  activeMonthBackground: {
    position: 'absolute',
    top: -35,
    left: '50%',
    width: 50,
    height: 349,
    marginLeft: -25, // Центрируем (width / 2)
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    opacity: 0.5,
  },
  activeMonth: {
    color: '#fff',
    fontWeight: 'bold',
    position: 'relative',
    zIndex: 1,
  },
  amount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Codec-Pro-Bold',
  },
  subtext: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 5,
    color: '#fff',
    fontFamily: 'Codec-Pro-News',
  },
  chart: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 80,
    marginLeft: -5,
  },
  svg: {
    width: '100%',
    height: '100%',
  },
  point: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#0ad3ff',
    borderWidth: 3,
    borderColor: '#fff',
    transform: [{ translateX: -5 }, { translateY: -12 }],
  },
  label: {
    position: 'absolute',
    backgroundColor: '#32d86e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    transform: [{ translateX: -25 }, { translateY: -35 }],
  },
  labelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Codec-Pro-Bold',
  },
});