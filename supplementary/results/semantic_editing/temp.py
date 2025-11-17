import os
from PIL import Image

for file in os.listdir('.'):
    if os.path.isdir(file):
        for model in os.listdir(file):
            if model in ['lora', 'no_lora', 'pretrained']:
                for item in os.listdir(os.path.join(file, model)):
                    print('item: ', item)
                    if '.png' in item:
                        
                        img_path = os.path.join(file, model, item)
                        os.remove(img_path)
                        #original_size = os.path.getsize(img_path)
                        #image = Image.open(img_path)

                        #width, height = image.size
                        #new_size = (width//2, height//2)
                        #resized_image = image.resize(new_size)

                        #resized_image.save(img_path.replace('.png', '.jpg'), optimize=True, quality=50)
                        #image.save(img_path.replace('.png', '.jpg'), optimize=True, quality=95)
                        
                        #compressed_size = os.path.getsize(img_path.replace('.png', '.jpg'))

                        #print("Original Size: ", original_size)
                        #print("Compressed Size: ", compressed_size)
                        