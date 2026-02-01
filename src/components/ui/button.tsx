
/**
 * Button Component - Shadcn/UI
 * 
 * A versatile button component built on top of Radix UI primitives.
 * Provides multiple variants, sizes, and accessibility features out of the box.
 * 
 * Features:
 * - Multiple visual variants (default, destructive, outline, etc.)
 * - Size variants (default, sm, lg, icon)
 * - Full accessibility support via Radix UI
 * - Forward ref support for external ref access
 * - Tailwind CSS styling with class variance authority
 * 
 * Libraries used:
 * - @radix-ui/react-slot: For polymorphic component behavior
 * - class-variance-authority: For variant-based styling
 * - React: For component logic and ref forwarding
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Button Variants Configuration
 * 
 * Uses class-variance-authority (cva) to create a systematic approach
 * to variant-based styling. This ensures consistent styling patterns
 * and makes it easy to add new variants.
 * 
 * Base Classes:
 * - Flexbox layout and alignment
 * - Typography and spacing
 * - Interactive states (hover, focus, disabled)
 * - Accessibility features
 * 
 * Variant System:
 * - variant: Visual style variations
 * - size: Size-based styling variations
 * 
 * @example
 * // Usage in component
 * <Button variant="destructive" size="lg">
 *   Delete Account
 * </Button>
 */
const buttonVariants = cva(
  // Base classes applied to all button variants
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      /**
       * Visual Variants
       * 
       * Each variant serves a specific UI purpose:
       * - default: Primary actions, most common use case
       * - destructive: Dangerous actions (delete, remove)
       * - outline: Secondary actions, less emphasis
       * - secondary: Alternative to outline, muted appearance
       * - ghost: Minimal styling, used in navigation
       * - link: Text-only, behaves like a link
       */
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      /**
       * Size Variants
       * 
       * Different sizes for various UI contexts:
       * - default: Standard button size for most use cases
       * - sm: Compact buttons for dense interfaces
       * - lg: Prominent buttons for key actions
       * - icon: Square buttons for icon-only content
       */
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Button Props Interface
 * 
 * Extends HTML button attributes with custom variant props.
 * Supports both regular button behavior and "asChild" polymorphic behavior.
 * 
 * @interface ButtonProps
 * @extends React.ButtonHTMLAttributes<HTMLButtonElement>
 * @extends VariantProps<typeof buttonVariants>
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * asChild prop enables polymorphic behavior
   * When true, renders the first child as the button element
   * Useful for creating button-styled links or other elements
   * 
   * @example
   * <Button asChild>
   *   <Link to="/dashboard">Go to Dashboard</Link>
   * </Button>
   */
  asChild?: boolean
}

/**
 * Button Component
 * 
 * Main button component with full feature set including:
 * - Variant-based styling system
 * - Forward ref support for external access
 * - Polymorphic behavior via asChild prop
 * - Full accessibility compliance
 * - Custom class name merging
 * 
 * @param {ButtonProps} props - Component props
 * @param {React.Ref<HTMLButtonElement>} ref - Forwarded ref
 * @returns {JSX.Element} Rendered button component
 * 
 * @example
 * // Basic usage
 * <Button>Click me</Button>
 * 
 * @example
 * // With variants
 * <Button variant="outline" size="lg">
 *   Large Outline Button
 * </Button>
 * 
 * @example
 * // As a link (polymorphic)
 * <Button asChild>
 *   <a href="/external-link">External Link</a>
 * </Button>
 * 
 * @example
 * // With custom styling
 * <Button className="w-full mt-4" variant="destructive">
 *   Delete Everything
 * </Button>
 * 
 * @example
 * // With icons
 * <Button variant="outline" size="icon">
 *   <Icon name="settings" />
 * </Button>
 * 
 * @example
 * // Event handling
 * <Button onClick={() => handleSave()}>
 *   Save Changes
 * </Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Choose component type based on asChild prop
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

// Set display name for React DevTools
Button.displayName = "Button"

export { Button, buttonVariants }

/**
 * Usage Guidelines:
 * 
 * 1. Variant Selection:
 *    - Use 'default' for primary actions
 *    - Use 'destructive' for dangerous actions
 *    - Use 'outline' or 'secondary' for secondary actions
 *    - Use 'ghost' for navigation or minimal emphasis
 *    - Use 'link' for text-only button behavior
 * 
 * 2. Size Selection:
 *    - Use 'default' for most cases
 *    - Use 'sm' in compact interfaces or forms
 *    - Use 'lg' for prominent call-to-action buttons
 *    - Use 'icon' for icon-only buttons
 * 
 * 3. Accessibility:
 *    - Always provide meaningful button text or aria-label
 *    - Use semantic HTML when possible
 *    - Consider focus management in complex interfaces
 * 
 * 4. Performance:
 *    - Component is memoized and optimized for re-renders
 *    - Variants are pre-computed at build time
 *    - No runtime style calculations
 */
