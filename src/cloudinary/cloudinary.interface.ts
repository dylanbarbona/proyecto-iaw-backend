export interface CloudinaryFile {
    asset_id: string,
    public_id: string,
    version: number,
    version_id: string
    signature: string
    width: number,
    height: number,
    format: string,
    resource_type: string,
    created_at: Date,
    tags: string[],
    pages: number,
    bytes: number,
    type: string,
    etag: string,
    placeholder: boolean,
    url: string,
    secure_url: string,
    original_filename: string,
    audio: {
        codec: string,
        bit_rate: string,
        frequency: number,
        channels: number,
        channel_layout: string
    }
    video: {
        pix_format: string,
        codec: string,
        level: number,
        profile: string,
        bit_rate: string
    },
    is_audio: boolean,
    frame_rate: number,
    bit_rate: number,
    duration: number,
    rotation: number,
    nb_frames: number
}