import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const ClimateVisualization = () => {
    const sketchRef = useRef();

    useEffect(() => {
        let myp5 = new p5(sketch, sketchRef.current);
        return () => {
            myp5.remove();
        };
    }, []);

    const sketch = (p) => {
        let temperature = 25; // Static temperature
        let humidity = 70;    // Static humidity
        let thermometerHeight, humidityWidth;
        let oscillation = 10;  // Amplitude for oscillation

        p.setup = () => {
            p.createCanvas(600, 400);
            p.frameRate(40);
            thermometerHeight = p.height * 0.7;
            humidityWidth = p.width * 0.4;
        };

        p.draw = () => {
            p.background(240);
            
            // Temperature visualization (Thermometer)
            drawThermometer();
            
            // Humidity visualization (Water drop)
            drawHumidity();
        };

        const drawThermometer = () => {
            const x = p.width * 0.25;
            const y = p.height * 0.9;
            const w = 40;
            
            // Thermometer outline
            p.stroke(100);
            p.fill(255);
            p.rect(x - w / 2, y - thermometerHeight, w, thermometerHeight, 20);
            p.circle(x, y, w * 1.5);
            
            // Temperature fill with oscillation effect
            const fillHeight = p.map(temperature, 0, 40, 0, thermometerHeight);
            const oscillatedFillHeight = fillHeight + oscillation * Math.sin(p.frameCount * 0.1);
            p.noStroke();
            p.fill(255, 100, 100);
            p.rect(x - w / 2 + 5, y - oscillatedFillHeight, w - 10, oscillatedFillHeight, 15);
            p.circle(x, y, w);
            
            // Temperature text
            p.fill(50);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(24);
            p.text(`${temperature.toFixed(1)}°C`, x, y - thermometerHeight - 30);
            
            // Temperature label
            p.textSize(16);
            p.text('Temperatura', x, y - thermometerHeight - 60);
            
            // Scale
            for (let i = 0; i <= 40; i += 10) {
                const lineY = p.map(i, 0, 40, y, y - thermometerHeight);
                p.stroke(100);
                p.line(x - w / 2 - 5, lineY, x - w / 2, lineY);
                p.noStroke();
                p.fill(100);
                p.textAlign(p.RIGHT, p.CENTER);
                p.textSize(12);
                p.text(i, x - w / 2 - 10, lineY);
            }
        };

        const drawHumidity = () => {
            const x = p.width * 0.7;
            const y = p.height * 0.5;

            // Water drop outline
            p.stroke(100);
            p.fill(255);
            p.beginShape();
            p.vertex(x, y - 80);
            p.bezierVertex(x - 40, y, x - 40, y + 20, x, y + 40);
            p.bezierVertex(x + 40, y + 20, x + 40, y, x, y - 80);
            p.endShape();

            // Humidity fill with oscillation effect
            p.noStroke();
            p.fill(100, 100, 255, 200);
            const fillHeight = p.map(humidity, 0, 100, 0, 120);
            const oscillatedFillHeight = fillHeight + oscillation * Math.sin(p.frameCount * 0.1);
            p.beginShape();
            p.vertex(x, y + 40);
            p.bezierVertex(x - 40, y + 20, x - 40, y + 40 - oscillatedFillHeight, x, y + 40 - oscillatedFillHeight);
            p.bezierVertex(x + 40, y + 40 - oscillatedFillHeight, x + 40, y + 20, x, y + 40);
            p.endShape();
            
            // Humidity text
            p.fill(50);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(24);
            p.text(`${humidity.toFixed(1)}%`, x, y + 70);
            
            // Humidity label
            p.textSize(16);
            p.text('Humedad', x, y + 100);
        };
    };

    return <div ref={sketchRef} className="climate-visualization"></div>;
};

export default ClimateVisualization;
