"use client";

import { Smartphone, Laptop, Headphones, Keyboard, Cpu, Microchip, ChevronDown } from "lucide-react";
import { useState } from "react";

export const TechGear = () => {
  const [expandedDevice, setExpandedDevice] = useState<string | null>(null);

  const toggleDevice = (device: string) => {
    setExpandedDevice(expandedDevice === device ? null : device);
  };

  return (
    <div className="p-0">
      <div className="space-y-2">
        <h3 className="px-5 py-3 text-sm font-medium text-muted-foreground">Current Devices</h3>
        <div className="grid">
          <button 
            onClick={() => toggleDevice('phone')}
            className="flex items-center justify-between w-full px-5 py-3 hover:bg-muted/50 transition-colors border-b border-border"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-muted/50">
                <Smartphone className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Samsung Galaxy A52s</p>
              </div>
            </div>
            <ChevronDown className={`size-4 text-muted-foreground transition-transform ${expandedDevice === 'phone' ? 'rotate-180' : ''}`} />
          </button>
          {expandedDevice === 'phone' && (
            <div className="px-5 py-3 border-b border-border bg-muted/5">
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Processor</span>
                  <span>Qualcomm Snapdragon 778G</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">RAM</span>
                  <span>8GB LPDDR4X</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Storage</span>
                  <span>128GB UFS 2.2</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Display</span>
                  <span>6.5&quot; FHD+ 120Hz</span>
                </li>
              </ul>
            </div>
          )}

          <button 
            onClick={() => toggleDevice('pc')}
            className="flex items-center justify-between w-full px-5 py-3 hover:bg-muted/50 transition-colors border-b border-border"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-muted/50">
                <Cpu className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Custom Rig</p>
              </div>
            </div>
            <ChevronDown className={`size-4 text-muted-foreground transition-transform ${expandedDevice === 'pc' ? 'rotate-180' : ''}`} />
          </button>
          {expandedDevice === 'pc' && (
            <div className="px-5 py-3 border-b border-border bg-muted/5">
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">CPU</span>
                  <span>AMD Ryzen 7 5600 (8C + 16T)</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">GPU</span>
                  <span>NVIDIA RTX 3090 8GB GDDR5</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">RAM</span>
                  <span>32GB DDR5 XMP</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Storage</span>
                  <span>Kingston NVME3 1TB</span>
                </li>
              </ul>
            </div>
          )}

          <button 
            onClick={() => toggleDevice('server')}
            className="flex items-center justify-between w-full px-5 py-3 hover:bg-muted/50 transition-colors border-b border-border"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-muted/50">
                <Laptop className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Lenovo V15 G4</p>
                <p className="text-sm text-muted-foreground">Home Server</p>
              </div>
            </div>
            <ChevronDown className={`size-4 text-muted-foreground transition-transform ${expandedDevice === 'server' ? 'rotate-180' : ''}`} />
          </button>
          {expandedDevice === 'server' && (
            <div className="px-5 py-3 border-b border-border bg-muted/5">
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">CPU</span>
                  <span>AMD Ryzen 5 5500U</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">RAM</span>
                  <span>16GB DDR4</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Storage</span>
                  <span>Samsung NVME2 512GB</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">OS</span>
                  <span>Ubuntu Server 22.04 LTS</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mt-2">
        <h3 className="px-5 py-3 text-sm font-medium text-muted-foreground">Current Gear</h3>
        <div className="grid">
          <div className="flex items-center gap-3 px-5 py-3 hover:bg-muted/50 transition-colors border-b border-border">
            <div className="p-2 rounded-md bg-muted/50">
              <Headphones className="size-4 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">Tangzu Wan&apos;er SG 2</p>
              <p className="text-sm text-muted-foreground">K-BEAR 8-Core, Kinera Celest Ruyi Pro</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-5 py-3 hover:bg-muted/50 transition-colors border-b border-border">
            <div className="p-2 rounded-md bg-muted/50">
              <Microchip className="size-4 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">Venture Electronics Odo</p>
              <p className="text-sm text-muted-foreground">KT02H20 DAC</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-5 py-3 hover:bg-muted/50 transition-colors border-b border-border">
            <div className="p-2 rounded-md bg-muted/50">
              <Keyboard className="size-4 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">Aula F75</p>
              <p className="text-sm text-muted-foreground">75% Wireless Gasket Mounted Keyboard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 