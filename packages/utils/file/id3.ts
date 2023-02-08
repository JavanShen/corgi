import { BrowserFileReader } from 'id3js/lib/browserFileReader'
import { RemoteReader } from 'id3js/lib/remoteReader'
import { parse } from 'id3js/lib/id3Tag'
import type { ID3Tag } from 'id3js/lib/id3Tag'
import type { Reader } from 'id3js/lib/reader'
import { fromReader } from 'id3js'

const id3FromReader = async (reader: Reader): Promise<ID3Tag | null> => {
    await reader.open()

    const tags = await parse(reader)

    await reader.close()

    return tags
}

const id3FromFile = (file: File | Blob): Promise<ID3Tag | null> => {
    const SUPPORTS_FILE =
        typeof window !== 'undefined' &&
        window.File &&
        window.FileReader &&
        typeof ArrayBuffer !== 'undefined'

    if (!SUPPORTS_FILE) {
        throw new Error(
            'Browser does not have support for the File API and/or ' +
                'ArrayBuffers'
        )
    }

    return id3FromReader(new BrowserFileReader(file as File))
}

const id3FromUrl = (url: string): Promise<ID3Tag | null> =>
    fromReader(new RemoteReader(url))

export { id3FromFile, id3FromUrl }
