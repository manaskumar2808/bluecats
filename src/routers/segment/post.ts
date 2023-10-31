import fs from 'fs';
import util from 'util';
import express, { Request, Response, NextFunction } from "express";
import { StatusCode } from "../../constants/status";
import { uploadFile } from '../../../s3';
import { getModifiedImageURL } from '../../utility/image';
import { validateRequest } from '../../middlewares/validate-request';
import authMiddlware from '../../middlewares/auth-middleware';
import requireAuth from '../../middlewares/require-auth';
import { SegmentType } from '../../constants/segment';
import { Segment } from '../../models/segment';
import { SegmentValidator } from '../../validators/segment';
import { MediaPayload } from '../../types/segment/media-payload';
import { TextPayload } from '../../types/segment/text-payload';
import { CodePayload } from '../../types/segment/code-payload';

const Route = express.Router();

const unlink = util.promisify(fs.unlink);

Route.post('/api/segment/', authMiddlware, requireAuth, SegmentValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, text, url: mediaUrl, mediaType, caption, code, language, theme, type = SegmentType.TEXT } = req?.body || {};

        let segment;
        
        if(id)
            segment = await Segment.findById(id);

        switch(type) {
            case SegmentType.TEXT:
                const textPayload: TextPayload = {
                    text,
                }

                if(segment)
                    segment.set({ payload: textPayload });
                else
                    segment = Segment.build({ payload: textPayload, type });

                await segment.save();

                break;
            case SegmentType.MEDIA:
                const file = req?.file as Express.Multer.File;
        
                let cdnUrl: string | undefined;
                let cdn: boolean = false;
                if ((!segment || !(segment?.payload as MediaPayload)?.url) && file) {
                    cdnUrl = file.path as string;
                    const result: any = await uploadFile(file);
                    cdnUrl = 'uploads/' + result.Key;
                    cdn = true;
                    await unlink(file.path);
                }
        
                const url = cdnUrl || mediaUrl;
                const mediaPayload: MediaPayload = {
                    cdn,
                    caption,
                    url,
                    mediaType,
                };

                if(segment)
                    segment.set({ payload: mediaPayload });
                else
                    segment = Segment.build({ payload: mediaPayload, type });

                await segment.save();

                (segment.payload as MediaPayload).url = getModifiedImageURL((segment?.payload as MediaPayload)?.url);
                break;
            case SegmentType.CODE:
                const codePayload: CodePayload = {
                    code, 
                    language,
                    theme,
                }

                if(segment)
                    segment.set({ payload: codePayload });
                else
                    segment = Segment.build({ payload: codePayload, type });

                await segment.save();    
                break;
            default:
                break;
        }

        res.status(StatusCode.SUCCESS).send({
            message: 'Segment saved successfully',
            payload: {
                segment,
            }
        });
    } catch(err) {
        next(err);
    }
});

export { Route as PostSegmentRoute };