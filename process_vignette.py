import sys
from PIL import Image, ImageEnhance, ImageOps, ImageDraw, ImageFilter

def process_image():
    # Use the original uploaded image which has the black background
    input_path = r"C:\Users\USER\.gemini\antigravity\brain\1ca64a6e-446b-43c8-817b-311506dca950\uploaded_media_1769670097221.png"
    output_path = r"c:\Users\USER\Desktop\port\public\profile_vignette.png"
    
    print(f"Processing {input_path}...")
    
    # 1. Load Original
    try:
        img = Image.open(input_path).convert("RGBA")
    except Exception as e:
        print(f"Error opening image: {e}")
        return

    # 2. Convert to Grayscale (B&W) but keep RGBA for alpha
    gray = ImageOps.grayscale(img).convert("RGB")
    r, g, b = gray.split()
    
    # 3. Create a Vignette Mask
    # We want to keep the center opaque and fade the edges.
    # The original image likely has a black background already, so fading to transparent 
    # will smoothly blend from "Image Black" to "Website Background (Dark)".
    
    width, height = img.size
    
    # Create radial gradient mask
    # Center of gravity for the vignette (approx face position)
    center_x = width // 2
    center_y = height // 2.5 # Slightly up from center
    
    radius = min(width, height) * 0.8
    
    mask = Image.new("L", (width, height), 0)
    draw = ImageDraw.Draw(mask)
    
    # Draw a filled ellipse for the opaque center
    # We'll use a blurred ellipse to create the fade
    
    # Define a gradient mesh or simple radial fade
    # Simpler approach: Create a radial gradient from 255 to 0
    
    x = np.arange(width)
    y = np.arange(height)
    xx, yy = np.meshgrid(x, y)
    
    # Distance from center
    dist = np.sqrt((xx - center_x)**2 + (yy - center_y)**2)
    
    # Sigmoid or linear fade
    # max value at center, min at edges
    # Normalize dist: 0 at center, 1 at radius
    norm_dist = dist / (radius * 0.8)
    
    # Invert so center is 1 (opaque), edge is 0 (transparent)
    alpha = np.clip(1 - norm_dist, 0, 1)
    
    # Apply a curve to make the falloff nicer (keep center solid longer)
    alpha = alpha ** 0.5 # root curve pushes values higher (more solid center)
    
    # But wait, looking at the image, we want the BOTTOM to fade out completely (classic portrait fade)
    # So let's multiply by a vertical gradient as well.
    
    # Vertical fade (bottom 20% fades out)
    v_fade = np.ones((height, width))
    fade_start = int(height * 0.7)
    fade_len = height - fade_start
    
    for r_idx in range(fade_start, height):
        ratio = (r_idx - fade_start) / fade_len
        v_fade[r_idx, :] = 1 - ratio
        
    final_alpha = alpha * v_fade * 255
    final_alpha = final_alpha.astype(np.uint8)
    
    # Convert numpy alpha back to PIL
    mask_img = Image.fromarray(final_alpha, mode='L')
    
    # Merge
    final_img = Image.merge("RGBA", (r, g, b, mask_img))
    
    # 4. Enhance Contrast
    enhancer = ImageEnhance.Contrast(final_img)
    final_img = enhancer.enhance(1.1)
    
    # 5. Save
    final_img.save(output_path)
    print(f"Saved to {output_path}")

try:
    import numpy as np
except ImportError:
    print("Installing numpy...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "numpy"])
    import numpy as np

if __name__ == "__main__":
    process_image()
