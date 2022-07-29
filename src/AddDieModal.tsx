import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { makeId } from "./createId";
import { Die } from "./Interfaces/die";

export function AddDieModal({
    show,
    closeModal,
    addDie
}: {
    show: boolean;
    closeModal: () => void;
    addDie: (newDie: Die) => void;
}): JSX.Element {
    const [name, setName] = useState<string>("");
    const [sides, setSides] = useState<number>(6);
    function createDie() {
        const newDie = {
            id: makeId(),
            name: name,
            sides: sides,
            rollTotals: new Array(sides).fill(0)
        };
        addDie(newDie);
        setName("");
        setSides(6);
        closeModal();
    }
    return (
        <Modal show={show} onHide={closeModal} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Die</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="dropdownWidth" controlId="planName">
                    <Form.Label>Name of Die {"(Generally D#)"}: </Form.Label>
                    <Form.Control
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <Form.Label>How many sides{"(2-100)"}:</Form.Label>
                    <Form.Control
                        type="number"
                        min="2"
                        max="100"
                        value={sides}
                        onChange={(event) =>
                            setSides(parseInt(event.target.value))
                        }
                    />
                    {sides > 100 ? (
                        <span>No more than 100 sides</span>
                    ) : sides < 2 ? (
                        <span>Need at least 2 sides</span>
                    ) : (
                        <></>
                    )}
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={createDie}>
                    Create Die
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
