import sys
import os

try:
    from rembg import remove
    from PIL import Image
    import io
except ImportError as e:
    # Should be installed from previous step, but just in case
    print(f"Error importing modules: {e}")
    sys.exit(1)

input_path = r"C:\Users\USER\.gemini\antigravity\brain\1ca64a6e-446b-43c8-817b-311506dca950\uploaded_media_1769670097221.png"
output_path = r"c:\Users\USER\Desktop\port\public\profile_final.png"

print(f"Processing {input_path}...")

with open(input_path, 'rb') as i:
    input_data = i.read()
    output_data = remove(input_data, alpha_matting=True) # Try alpha matting for better edges
    
    with open(output_path, 'wb') as o:
        o.write(output_data)

print(f"Saved to {output_path}")
print("Done.")
