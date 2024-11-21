import { faHome, faPlus, faTasks, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const AddTask = () => {
    return (
        <div className="fixed bottom-20 right-5">
            <Dialog>
                <DialogTrigger>
                    <div className="shadow-md rounded-full bg-purple p-5">
                        <FontAwesomeIcon className="text-white" icon={faPlus} />
                    </div>
                </DialogTrigger>
                <DialogContent className="w-[90%]">
                    <DialogHeader>
                        <DialogTitle>Tambah Tugas Baru</DialogTitle>
                        <DialogDescription>
                            Isi form berikut untuk data tugas baru anda
                        </DialogDescription>
                    </DialogHeader>
                    <div className="">
                        <div className="">
                            <Label htmlFor="name" className="text-right">
                                Nama Tugas
                            </Label>
                            <Input
                                id="name"
                                defaultValue=""
                                className="col-span-3"
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="matkul" className="text-right">
                                Mata Kuliah
                            </Label>
                            <Input
                                id="matkul"
                                defaultValue=""
                                className="col-span-3"
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="deadline" className="text-right">
                                Deadline Tugas
                            </Label>
                            <Input
                                id="deadline"
                                defaultValue=""
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button className="bg-purple" type="submit">Simpan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
