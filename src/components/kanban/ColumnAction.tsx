import {useRef, useState} from "react";
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import toast from "react-hot-toast";
import { UniqueIdentifier } from '@dnd-kit/core';
import * as React from 'react';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '../ui/input';
import {useTaskStore} from "@/hooks/useTaskStore";

export function ColumnActions({title, id}: {
    title: string;
    id: UniqueIdentifier;
}) {
    const [name, setName] = useState(title);
    const { updateColumn, deleteColumn } = useTaskStore();
    const [editDisable, setIsEditDisable] = useState(true);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setIsEditDisable(!editDisable);
                    updateColumn(id, name);
                    toast.success(`${title} updated to ${name}`)
                }}
            >
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="!mt-0 mr-auto text-base disabled:cursor-pointer disabled:border-none disabled:opacity-100"
                    disabled={editDisable}
                    ref={inputRef}
                />
            </form>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" className="ml-1">
                        <span className="sr-only">Actions</span>
                        <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onSelect={() => {
                            setIsEditDisable(!editDisable);
                            setTimeout(() => {
                                inputRef.current && inputRef.current?.focus();
                            }, 500);
                        }}
                    >
                        Rename
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onSelect={() => setShowDeleteDialog(true)}
                        className="text-red-600"
                    >
                        Delete Section
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure want to delete column?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            NOTE: All tasks related to this category will also be deleted.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                // yes, you have to set a timeout
                                setTimeout(() => (document.body.style.pointerEvents = ''), 100);

                                setShowDeleteDialog(false);
                                deleteColumn(id);
                                toast.success('This column has been deleted.');
                            }}
                        >
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
