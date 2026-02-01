/**
 * Bar Chart Preview Component
 * 
 * A specialized chart component for displaying bar charts using the Recharts library.
 * Provides interactive bar chart visualization with customizable styling and data handling.
 * 
 * Features:
 * - Responsive bar chart rendering
 * - Customizable colors and styling
 * - Tooltip integration for data interaction
 * - Grid and axis customization
 * - Animation support
 * 
 * Libraries used:
 * - Recharts: React charting library built on D3
 * - React: Component lifecycle and state management
 * 
 * Use Cases:
 * - Sales data visualization
 * - Performance metrics display
 * - Categorical data comparison
 * - Dashboard KPI visualization
 * 
 * @example
 * const data = [
 *   { name: 'Jan', value: 400 },
 *   { name: 'Feb', value: 300 },
 *   { name: 'Mar', value: 600 }
 * ];
 * 
 * <BarChartPreview 
 *   data={data} 
 *   width={400} 
 *   height={300}
 *   color="#8884d8"
 * />
 */

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * Props interface for BarChartPreview component
 * 
 * @interface BarChartPreviewProps
 * @property {Array} data - Chart data array with name/value structure
 * @property {number} [width] - Optional chart width (defaults to responsive)
 * @property {number} [height] - Optional chart height (defaults to 300)
 * @property {string} [color] - Bar color (defaults to theme primary)
 * @property {string} [dataKey] - Data key for values (defaults to 'value')
 * @property {string} [nameKey] - Data key for names (defaults to 'name')
 * @property {function} [onDataPointClick] - Callback for data point clicks
 */
interface BarChartPreviewProps {
  data?: Array<{
    name: string;
    value: number;
    [key: string]: any;
  }>;
  width?: number;
  height?: number;
  color?: string;
  dataKey?: string;
  nameKey?: string;
  onDataPointClick?: (info: { label: string; value: number }) => void;
}

/**
 * Sample data for demonstration and testing
 * Used when no data is provided to the component
 */
const sampleData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
];

/**
 * BarChartPreview Component
 * 
 * Renders a responsive bar chart with customizable styling and data.
 * Handles responsive design and provides interactive tooltips.
 * 
 * @param {BarChartPreviewProps} props - Component properties
 * @returns {JSX.Element} Rendered bar chart component
 */
export default function BarChartPreview({
  data = sampleData,
  width,
  height = 300,
  color = "#8884d8",
  dataKey = "value",
  nameKey = "name",
  onDataPointClick,
}: BarChartPreviewProps) {
  /**
   * Custom tooltip formatter for better data display
   * Formats the tooltip content with proper labels and values
   * 
   * @param {number} value - The data value
   * @param {string} name - The data series name
   * @param {Object} props - Additional tooltip props
   * @returns {Array} Formatted tooltip content
   */
  const customTooltipFormatter = (value: number, name: string, props: any) => {
    return [
      `${value.toLocaleString()}`, // Format numbers with commas
      name === dataKey ? 'Value' : name // Clean up label names
    ];
  };

  /**
   * Custom label formatter for tooltip
   * Formats the tooltip label (usually the category name)
   * 
   * @param {string} label - The category label
   * @returns {string} Formatted label
   */
  const customLabelFormatter = (label: string) => {
    return `Category: ${label}`;
  };

  /**
   * Handles bar click events
   * Triggers callback with clicked data point information
   */
  const handleBarClick = (data: any) => {
    if (onDataPointClick) {
      onDataPointClick({
        label: data[nameKey],
        value: data[dataKey]
      });
    }
  };

  return (
    <div className="w-full">
      {/* Chart Title - Optional, can be removed if not needed */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Bar Chart Visualization
        </h3>
        <p className="text-sm text-gray-600">
          Interactive bar chart with {data.length} data points
        </p>
      </div>

      {/* Responsive Chart Container */}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          {/* Grid lines for better readability */}
          <CartesianGrid 
            strokeDasharray="3 3" 
            className="opacity-30"
          />
          
          {/* X-axis configuration */}
          <XAxis 
            dataKey={nameKey}
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: '#e0e0e0' }}
            axisLine={{ stroke: '#e0e0e0' }}
          />
          
          {/* Y-axis configuration */}
          <YAxis 
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: '#e0e0e0' }}
            axisLine={{ stroke: '#e0e0e0' }}
            tickFormatter={(value) => value.toLocaleString()}
          />
          
          {/* Interactive tooltip */}
          <Tooltip 
            formatter={customTooltipFormatter}
            labelFormatter={customLabelFormatter}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          />
          
          {/* Main bar series */}
          <Bar 
            dataKey={dataKey} 
            fill={color}
            radius={[4, 4, 0, 0]} // Rounded top corners
            className="transition-all duration-200 hover:opacity-80"
            onClick={handleBarClick}
            style={{ cursor: onDataPointClick ? 'pointer' : 'default' }}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Chart Footer - Optional metadata */}
      <div className="mt-2 text-xs text-gray-500 text-center">
        Data points: {data.length} | Last updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
}

/**
 * Usage Examples:
 * 
 * 1. Basic Usage:
 * ```jsx
 * const salesData = [
 *   { name: 'Q1', value: 15000 },
 *   { name: 'Q2', value: 20000 },
 *   { name: 'Q3', value: 18000 },
 *   { name: 'Q4', value: 25000 }
 * ];
 * 
 * <BarChartPreview data={salesData} />
 * ```
 * 
 * 2. Custom Styling:
 * ```jsx
 * <BarChartPreview 
 *   data={salesData}
 *   height={400}
 *   color="#ff6b6b"
 *   dataKey="sales"
 *   nameKey="quarter"
 * />
 * ```
 * 
 * 3. Dashboard Integration:
 * ```jsx
 * const DashboardChart = () => (
 *   <div className="bg-white p-6 rounded-lg shadow">
 *     <BarChartPreview 
 *       data={fetchedData}
 *       height={350}
 *       color="var(--primary-color)"
 *     />
 *   </div>
 * );
 * ```
 */
