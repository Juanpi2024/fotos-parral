import os
from PIL import Image

def optimize_images(source_dirs, output_base_dir, max_width=800, quality=80):
    """
    Finds all images in source_dirs, generates thumbnails, 
    and converts them to .webp and saves in output_base_dir.
    """
    if not os.path.exists(output_base_dir):
        os.makedirs(output_base_dir)

    supported_formats = ('.jpg', '.jpeg', '.png', '.bmp')
    
    for source_dir in source_dirs:
        print(f"Processing directory: {source_dir}")
        for root, dirs, files in os.walk(source_dir):
            for file in files:
                if file.lower().endswith(supported_formats):
                    file_path = os.path.join(root, file)
                    
                    # Create corresponding output subdirectory
                    relative_path = os.path.relpath(root, source_dir)
                    output_dir = os.path.join(output_base_dir, source_dir, relative_path)
                    if not os.path.exists(output_dir):
                        os.makedirs(output_dir)
                    
                    base_name = os.path.splitext(file)[0]
                    output_file_name = f"{base_name}.webp"
                    output_path = os.path.join(output_dir, output_file_name)
                    
                    # Thumbnail name
                    thumb_file_name = f"{base_name}_thumb.webp"
                    thumb_path = os.path.join(output_dir, thumb_file_name)

                    try:
                        with Image.open(file_path) as img:
                            # Convert to RGB if necessary (e.g., for RGBA to JPEG/WebP)
                            if img.mode in ("RGBA", "P"):
                                img = img.convert("RGB")

                            # Save optimized full-size version (WebP)
                            img.save(output_path, "WEBP", quality=quality)
                            print(f"  Optimized: {output_path}")

                            # Save Thumbnail
                            if img.width > max_width:
                                ratio = max_width / float(img.width)
                                new_height = int(float(img.height) * float(ratio))
                                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                            
                            img.save(thumb_path, "WEBP", quality=quality)
                            print(f"  Thumbnail: {thumb_path}")
                            
                    except Exception as e:
                        print(f"  Error processing {file_path}: {e}")

if __name__ == "__main__":
    # Configure directories to process
    source_directories = ['img', 'images']
    output_directory = 'optimized'
    
    optimize_images(source_directories, output_directory)
    print("\nOptimization complete!")
