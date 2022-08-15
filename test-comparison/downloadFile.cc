// emcc test-comparison/downloadFile.cc -o out/downloadFile.html -sWASM -sFETCH -std=c++11

#include <stdio.h>
#include <string.h>
#include <emscripten.h>
#include <emscripten/fetch.h>

void downloadSucceeded(emscripten_fetch_t *fetch)
{
    printf("Finished downloading %llu bytes from URL %s.\n", fetch->numBytes, fetch->url);
    // The data is now available at fetch->data[0] through fetch->data[fetch->numBytes-1];
    printf("%s\n", fetch->data); // 按行输出内容
                                 // consoleLog(fetch->data)
    emscripten_run_script("console.log('123456')");
    emscripten_fetch_close(fetch); // Free data associated with the fetch.
}

void downloadFailed(emscripten_fetch_t *fetch)
{
    printf("Downloading %s failed, HTTP failure status code: %d.\n", fetch->url, fetch->status);
    emscripten_run_script("console.log('123')");
    emscripten_fetch_close(fetch); // Also free data on failure.
}

void downloadProgress(emscripten_fetch_t *fetch)
{
    emscripten_run_script("console.log('456')");
    if (fetch->totalBytes)
    {
        printf("Downloading %s.. %.2f%% complete.\n", fetch->url, fetch->dataOffset * 100.0 / fetch->totalBytes);
    }
    else
    {
        printf("Downloading %s.. %lld bytes complete.\n", fetch->url, fetch->dataOffset + fetch->numBytes);
    }
}

extern "C"
{
    void EMSCRIPTEN_KEEPALIVE download(const char *url)
    {
        emscripten_run_script("console.log('1111')");

        EM_ASM({
            console.log('I received: ' + [ $0, $1 ]);
        },
               100, 35.5);

        emscripten_fetch_attr_t attr;
        emscripten_fetch_attr_init(&attr);
        strcpy(attr.requestMethod, "GET");
        attr.attributes = EMSCRIPTEN_FETCH_LOAD_TO_MEMORY;
        attr.onsuccess = downloadSucceeded;
        attr.onerror = downloadFailed;
        attr.onprogress = downloadProgress;
        emscripten_fetch(&attr, url);
    }
}

int main()
{
    emscripten_fetch_attr_t attr;
    emscripten_fetch_attr_init(&attr);
    strcpy(attr.requestMethod, "GET");
    attr.attributes = EMSCRIPTEN_FETCH_LOAD_TO_MEMORY;
    attr.onsuccess = downloadSucceeded;
    attr.onerror = downloadFailed;
    attr.onprogress = downloadProgress;
    emscripten_fetch(&attr, "data/myfile.dat");
}