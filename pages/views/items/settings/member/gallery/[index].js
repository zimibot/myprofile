import { Gallery } from "../../../../../../src/components/gallery"
import { Input } from "../../../../../../src/components/input"
import SettingsLayout from "../../../../../../src/components/layout/settings"
const GalleryRoute = () => {
    return <SettingsLayout>

        <div className="relative flex overflow-hidden justify-end">
            <label htmlFor="foto">
                <Input className="opacity-0 absolute top-0 left-0 cursor-pointer" type="file" name="foto"></Input>
                <div className="bg-slate-200 p-3 cursor-pointer hover:bg-blue-400 hover:text-white relative" id="foto">UPLOAD YOUR PHOTO</div>
            </label>
        </div>
        <div className="relative flex flex-col flex-1">
            <Gallery name="user" animation={"scale-in"}></Gallery>
        </div>
    </SettingsLayout>
}

export default GalleryRoute