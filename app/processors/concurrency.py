# Concurrently reading multiple files at once

import asyncio
from .loader import upload_file

async def concurrently_read(files):
    tasks = [upload_file(file) for file in files] #convert all files to dataframes and store
    return await asyncio.gather(*tasks) #runs concurrently 
