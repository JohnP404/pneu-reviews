import { deleteReview } from "@/firebase/write";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
	DotsHorizontalIcon,
	Pencil1Icon,
	TrashIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function ActionsDropdown({ id }: { id: string }) {
	const router = useRouter();

	async function deleteHandler() {
		await deleteReview(id);
		router.replace("/reviews");
	}

	function editHandler() {
		router.push(`/review/upload?id=${id}`);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<DotsHorizontalIcon
					width={20}
					height={20}
					className="cursor-pointer"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="z-30 absolute -left-2 bg-slate-600/80 rounded-md">
				<DropdownMenuItem
					onClick={deleteHandler}
					className="transition-colors flex items-center p-1 cursor-pointer hover:bg-destructive rounded-t-md"
				>
					<TrashIcon />
					<span>Deletar</span>
				</DropdownMenuItem>

				<DropdownMenuItem
					onClick={editHandler}
					className="transition-colors flex items-center p-1 cursor-pointer hover:bg-blue-600 rounded-b-md gap-1"
				>
					<Pencil1Icon />
					<span>Editar</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
