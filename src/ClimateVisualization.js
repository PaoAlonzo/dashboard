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
        let temperature = 25;
        let humidity = 70;
        let thermometerHeight, humidityWidth;

        p.setup = () => {
        p.createCanvas(600, 300);
        p.frameRate(30);
        thermometerHeight = p.height * 0.8;
        humidityWidth = p.width * 0.4;
        };

        p.draw = () => {
        p.background(240);
        
        // Temperature visualization (Thermometer)
        drawThermometer();
        
        // Humidity visualization (Water drop)
        drawHumidity();
        
        // Animate values (for demonstration)
        temperature = 20 + 10 * Math.sin(p.frameCount * 0.05);
        humidity = 50 + 30 * Math.sin(p.frameCount * 0.03);
        };

        const drawThermometer = () => {
        const x = p.width * 0.25;
        const y = p.height * 0.9;
        const w = 40;
        
        // Thermometer outline
        p.stroke(100);
        p.fill(255);
        p.rect(x - w/2, y - thermometerHeight, w, thermometerHeight, 20);
        p.circle(x, y, w * 1.5);
        
        // Temperature fill
        const fillHeight = p.map(temperature, 0, 40, 0, thermometerHeight);
        p.noStroke();
        p.fill(255, 100, 100);
        p.rect(x - w/2 + 5, y - fillHeight, w - 10, fillHeight, 15);
        p.circle(x, y, w);
        
        // Temperature text
        p.fill(50);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(24);
        p.text(`${temperature.toFixed(1)}°C`, x, y - thermometerHeight - 30);
        
        // Scale
        for (let i = 0; i <= 40; i += 10) {
            const lineY = p.map(i, 0, 40, y, y - thermometerHeight);
            p.stroke(100);
            p.line(x - w/2 - 5, lineY, x - w/2, lineY);
            p.noStroke();
            p.fill(100);
            p.textAlign(p.RIGHT, p.CENTER);
            p.textSize(12);
            p.text(i, x - w/2 - 10, lineY);
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
        
        // Humidity fill
        p.noStroke();
        p.fill(100, 100, 255, 200);
        const fillHeight = p.map(humidity, 0, 100, 0, 120);
        p.beginShape();
        p.vertex(x, y + 40);
        p.bezierVertex(x - 40, y + 20, x - 40, y + 40 - fillHeight, x, y + 40 - fillHeight);
        p.bezierVertex(x + 40, y + 40 - fillHeight, x + 40, y + 20, x, y + 40);
        p.endShape();
        
        // Humidity text
        p.fill(50);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(24);
        p.text(`${humidity.toFixed(1)}%`, x, y + 70);
        
        // Humidity label
        p.textSize(16);
        p.text('Humidity', x, y + 100);
        };
    };

    return <div ref={sketchRef} className="climate-visualization"></div>;
};

export default ClimateVisualization;